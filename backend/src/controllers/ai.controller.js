import { suggestSlots } from "../services/ai.service.js";

export const getSuggestedSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const suggestions = await suggestSlots(doctorId, date);

    res.status(200).json({
      message: "AI slot suggestions generated",
      slots:suggestions
    });
  } catch (error) {
    console.error("Claude error:", error.response?.data || error.message);
  res.status(400).json({ message: error.message });
  }
};
