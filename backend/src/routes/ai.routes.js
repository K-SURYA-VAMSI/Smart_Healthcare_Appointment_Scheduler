import { Router } from "express";
import { getSuggestedSlots } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/suggest-slots",
  protect,
  allowRoles("patient"),
  getSuggestedSlots
);

export default router;
