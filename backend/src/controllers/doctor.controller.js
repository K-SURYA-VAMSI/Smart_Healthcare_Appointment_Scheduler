import {
    createDoctorProfile,
    getAllDoctors,
    getDoctorById
  } from "../services/doctor.service.js";
  
  export const createDoctor = async (req, res) => {
    try {
      const doctor = await createDoctorProfile(req.body, req.user.id);
      res.status(201).json(doctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getDoctors = async (req, res) => {
    const doctors = await getAllDoctors();
    res.status(200).json(doctors);
  };
  
  export const getDoctor = async (req, res) => {
    const doctor = await getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  };
  