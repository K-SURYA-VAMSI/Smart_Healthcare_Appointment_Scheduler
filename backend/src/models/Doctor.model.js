import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true
    },
    consultationDuration: {
      type: Number,
      default: 30
    }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
