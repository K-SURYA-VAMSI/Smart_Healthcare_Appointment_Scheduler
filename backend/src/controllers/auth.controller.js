import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUser(email, password);
  
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      });
  
      res.status(200).json({
        message: "Login successful",
        user
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  