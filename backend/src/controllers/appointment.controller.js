import {
    bookAppointment,
    cancelAppointment
  } from "../services/appointment.service.js";
  
  export const createAppointment = async (req, res) => {
    try {
      const { doctorId, date, timeSlot } = req.body;
  
      const appointment = await bookAppointment(
        req.user.id,
        doctorId,
        date,
        timeSlot
      );
  
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const cancel = async (req, res) => {
    try {
      const result = await cancelAppointment(req.params.id, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  