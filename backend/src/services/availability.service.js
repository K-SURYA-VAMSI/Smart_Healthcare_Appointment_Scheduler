import Availability from "../models/Availability.model.js";

export const setAvailability = async (doctorId, data) => {
  const existing = await Availability.findOne({
    doctorId,
    date: data.date
  });

  if (existing) {
    throw new Error("Availability already set for this date");
  }

  return await Availability.create({
    doctorId,
    ...data
  });
};

export const getAvailability = async (doctorId, date) => {
  return await Availability.findOne({ doctorId, date });
};
