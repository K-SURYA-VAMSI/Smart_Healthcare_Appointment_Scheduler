import Availability from "../models/Availability.model.js";
import Appointment from "../models/Appointment.model.js";
import Doctor from "../models/Doctor.model.js";
import axios from "axios";

export const suggestSlots = async (doctorId, date) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  const availability = await Availability.findOne({ doctorId, date });
  if (!availability) throw new Error("Doctor not available on this date");

  const bookedAppointments = await Appointment.find({
    doctorId,
    date,
    status: "booked"
  });

  const prompt = `
You are an appointment scheduling assistant.

Doctor working hours:
${availability.workingHours.startTime} to ${availability.workingHours.endTime}

Breaks:
${JSON.stringify(availability.breaks)}

Already booked slots:
${JSON.stringify(bookedAppointments.map(a => a.timeSlot))}

Consultation duration:
${doctor.consultationDuration} minutes

TASK:
Return ONLY a valid JSON array of available time slots.
Do NOT include explanations, text, or markdown.

FORMAT (strict):
[
  { "startTime": "HH:MM", "endTime": "HH:MM" }
]
`;


  const response = await axios.post(
    "https://api.anthropic.com/v1/messages",
    {
      model: "claude-3-haiku-20240307",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      }
    }
  );
  const extractJSON = (text) => {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("AI response is not valid JSON");
    return JSON.parse(match[0]);
  };
  

  const rawText = response.data.content[0].text;
  const slots = extractJSON(rawText);
  return slots;
};
