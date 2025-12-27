import { Router } from "express";
import {
  createAvailability,
  fetchAvailability
} from "../controllers/availability.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  allowRoles("doctor"),
  createAvailability
);

router.get("/", protect, fetchAvailability);

export default router;
