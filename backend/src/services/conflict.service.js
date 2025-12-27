import Appointment from "../models/Appointment.model.js";

export const hasConflict = async (
  doctorId,
  date,
  startTime,
  endTime
) => {
  const conflict = await Appointment.findOne({
    doctorId,
    date,
    status: "booked",
    $or: [
      {
        "timeSlot.startTime": { $lt: endTime },
        "timeSlot.endTime": { $gt: startTime }
      }
    ]
  });

  return !!conflict;
};
