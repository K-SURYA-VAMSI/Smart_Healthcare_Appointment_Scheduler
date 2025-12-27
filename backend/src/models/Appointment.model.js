import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    timeSlot: {
      startTime: { type: String },
      endTime: { type: String }
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked"
    }
  },
  { timestamps: true }
);

appointmentSchema.index(
  { doctorId: 1, date: 1, "timeSlot.startTime": 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);
