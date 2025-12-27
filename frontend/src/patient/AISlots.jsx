import { useState } from "react";
import api from "../api/axios";

function AISlots({ doctorId, date, onAppointmentBooked }) {
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
      
      // Remove the booked slot from the list
      setSlots(prevSlots => prevSlots.filter(s => 
        s.startTime !== slot.startTime || s.endTime !== slot.endTime
      ));
      
      // Trigger refresh of MyAppointments component
      if (onAppointmentBooked) {
        onAppointmentBooked();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl shadow-lg p-6 border border-cyan-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-2 rounded-lg">
            <span className="text-xl text-white">🤖</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            AI Suggested Available Times
          </h3>
        </div>
        <button
          onClick={fetchSlots}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </>
          ) : (
            <>
              <span>✨</span>
              Get AI Slots
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-cyan-600 border-t-transparent mb-3"></div>
          <p className="text-gray-600">AI is analyzing available slots...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4">
          <p className="text-red-700 font-medium">⚠️ {error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-4">
          <p className="text-green-700 font-medium">✅ {success}</p>
        </div>
      )}

      {!loading && slots.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.map((slot, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 flex justify-between items-center hover:border-teal-400 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <span className="text-lg">🕐</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {slot.startTime} – {slot.endTime}
                </span>
              </div>
              <button
                onClick={() => bookSlot(slot)}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && slots.length === 0 && !error && (
        <div className="text-center py-8 bg-white rounded-xl border-2 border-dashed border-gray-300">
          <span className="text-4xl mb-2 block">📋</span>
          <p className="text-gray-500">Click "Get AI Slots" to see available times</p>
        </div>
      )}
    </div>
  );
}

export default AISlots;
