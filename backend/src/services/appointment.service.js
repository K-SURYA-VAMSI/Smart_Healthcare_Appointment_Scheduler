import Appointment from "../models/Appointment.model.js";
import Availability from "../models/Availability.model.js";
import Doctor from "../models/Doctor.model.js";
import { hasConflict } from "./conflict.service.js";
import User from "../models/User.model.js";
import { sendSMS } from "./notification.service.js";



export const bookAppointment = async (
  patientId,
  doctorId,
  date,
  timeSlot
) => {
    

  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  const doctorProfile = await Doctor.findById(doctorId);
    if (doctorProfile.userId.toString() === patientId.toString()) {
        throw new Error("You cannot book an appointment with yourself");
      }

  const availability = await Availability.findOne({ doctorId, date });
  if (!availability) throw new Error("Doctor not available on this date");

  const conflict = await hasConflict(
    doctorId,
    date,
    timeSlot.startTime,
    timeSlot.endTime
  );
  if (conflict) throw new Error("Time slot already booked");

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    timeSlot
  });

const patient = await User.findById(patientId);
const doctorUser = await User.findById(doctor.userId);

try {
    await sendSMS(
      patient.phoneNumber,
      `Your appointment is confirmed on ${date} from ${timeSlot.startTime} to ${timeSlot.endTime}.`
    );
  
    await sendSMS(
      doctorUser.phoneNumber,
      `New appointment scheduled on ${date} from ${timeSlot.startTime} to ${timeSlot.endTime}.`
    );
  } catch (smsError) {
    console.error("SMS failed:", smsError.message);
  }
  

  return appointment;
};

export const cancelAppointment = async (id, userId) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error("Appointment not found");

  if (appointment.patientId.toString() !== userId.toString()) {
    throw new Error("You are not authorized to cancel this appointment");
  }

  const doctor = await Doctor.findById(appointment.doctorId);
  const patient = await User.findById(appointment.patientId);
  const doctorUser = await User.findById(doctor.userId);

  await Appointment.findByIdAndDelete(id);

  try {
    await sendSMS(
      patient.phoneNumber,
      `Your appointment on ${appointment.date} has been cancelled.`
    );

    await sendSMS(
      doctorUser.phoneNumber,
      `Appointment on ${appointment.date} has been cancelled.`
    );
  } catch (smsError) {
    console.error("SMS failed during cancellation:", smsError.message);
  }

  return { message: "Appointment cancelled successfully" };
};
