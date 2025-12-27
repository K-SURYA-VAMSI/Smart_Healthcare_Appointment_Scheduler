import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    workingHours: {
      startTime: { type: String }, // "09:00"
      endTime: { type: String }    // "17:00"
    },
    breaks: [
      {
        startTime: String,
        endTime: String
      }
    ],
    blockedSlots: [
      {
        startTime: String,
        endTime: String
      }
    ]
  },
  { timestamps: true }
);

availabilitySchema.index({ doctorId: 1, date: 1 }, { unique: true });

export default mongoose.model("Availability", availabilitySchema);
