import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  getDoctor,
  getMyProfile,
  updateMyProfile
} from "../controllers/doctor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", protect, allowRoles("doctor"), createDoctor);

router.get("/me", protect, allowRoles("doctor"), getMyProfile);
router.put("/me", protect, allowRoles("doctor"), updateMyProfile);

router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctor);

export default router;
