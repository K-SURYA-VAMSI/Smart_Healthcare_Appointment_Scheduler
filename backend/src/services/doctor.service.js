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
