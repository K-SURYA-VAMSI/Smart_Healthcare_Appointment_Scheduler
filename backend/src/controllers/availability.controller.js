import {
    setAvailability,
    getAvailability
  } from "../services/availability.service.js";
  import Doctor from "../models/Doctor.model.js";
  import { generateSlots } from "../utils/slotGenerator.js";
  
  export const createAvailability = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId: req.user.id });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }
  
      const availability = await setAvailability(doctor._id, req.body);
      res.status(201).json(availability);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const fetchAvailability = async (req, res) => {
    const { doctorId, date } = req.query;
  
    const availability = await getAvailability(doctorId, date);
    if (!availability) {
      return res.status(404).json({ message: "No availability found" });
    }
  
    res.status(200).json(availability);
  };
  