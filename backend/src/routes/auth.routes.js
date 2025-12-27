import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", protect, (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });
  
    res.status(200).json({
      message: "Logged out successfully"
    });
  });
  

router.get("/me", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
