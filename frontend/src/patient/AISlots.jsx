import { useState } from "react";
import api from "../api/axios";

function AISlots({ doctorId, date }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchSlots = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/ai/suggest-slots", {
        doctorId,
        date
      });
      setSlots(res.data.slots || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slot) => {
    setError("");
    setSuccess("");

    try {
      await api.post("/appointments", {
        doctorId,
        date,
        timeSlot: slot
      });
      setSuccess("Appointment booked successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          AI Suggested Available Times
        </h3>
        <button
          onClick={fetchSlots}
          className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
        >
          Get AI Slots
        </button>
      </div>

      {loading && <p>Loading AI suggestions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <span>
              {slot.startTime} – {slot.endTime}
            </span>
            <button
              onClick={() => bookSlot(slot)}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AISlots;
