import express from "express";

import { Router } from "express";
import {
  createAppointment,
  cancel
} from "../controllers/appointment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import Appointment from "../models/Appointment.model.js";

const router = Router();

router.post(
    "/",
    protect,
    allowRoles("patient"),
    createAppointment
  );

  router.get("/my", protect, async (req, res) => {
    try {
      const appointments = await Appointment.find({
        patientId: req.user.id
      })
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "name"
          }
        })
        .sort({ createdAt: -1 });
  
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });
  
  router.put("/:id/cancel", protect, cancel);
  router.delete("/:id", protect, cancel);

export default router;
