import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor
} from "../controllers/doctor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

// Doctor creates own profile
router.post("/", protect, allowRoles("doctor"), createDoctor);

// Patient & doctor can view doctors
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctor);

export default router;
