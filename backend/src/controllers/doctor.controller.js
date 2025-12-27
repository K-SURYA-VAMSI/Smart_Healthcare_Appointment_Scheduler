import {
    createDoctorProfile,
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
    updateDoctorProfile
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

  export const getMyProfile = async (req, res) => {
    try {
      const doctor = await getDoctorByUserId(req.user.id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateMyProfile = async (req, res) => {
    try {
      const doctor = await updateDoctorProfile(req.user.id, req.body);
      res.status(200).json(doctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  