import Doctor from "../models/Doctor.model.js";

export const createDoctorProfile = async (data, userId) => {
  const existing = await Doctor.findOne({ userId });
  if (existing) {
    throw new Error("Doctor profile already exists");
  }

  const doctor = await Doctor.create({
    ...data,
    userId
  });

  return doctor;
};

export const getAllDoctors = async () => {
  return Doctor.find().populate("userId", "name email");
};

export const getDoctorById = async (id) => {
  return Doctor.findById(id).populate("userId", "name email");
};

export const getDoctorByUserId = async (userId) => {
  return Doctor.findOne({ userId }).populate("userId", "name email");
};

export const updateDoctorProfile = async (userId, data) => {
  const doctor = await Doctor.findOne({ userId });
  if (!doctor) {
    throw new Error("Doctor profile not found");
  }

  doctor.specialization = data.specialization || doctor.specialization;
  doctor.experience = data.experience !== undefined ? data.experience : doctor.experience;
  doctor.consultationDuration = data.consultationDuration !== undefined ? data.consultationDuration : doctor.consultationDuration;

  await doctor.save();
  return doctor;
};