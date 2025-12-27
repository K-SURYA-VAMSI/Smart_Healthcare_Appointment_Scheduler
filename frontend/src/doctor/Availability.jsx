import { useState } from "react";
import api from "../api/axios";

function Availability() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/availability", {
        date,
        workingHours: {
          startTime,
          endTime
        },
        breaks:
          breakStart && breakEnd
            ? [{ startTime: breakStart, endTime: breakEnd }]
            : []
      });

      setSuccess("Availability saved successfully");
      setDate("");
      setStartTime("");
      setEndTime("");
      setBreakStart("");
      setBreakEnd("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">
        Set Availability
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Available Time */}
        <div>
          <h4 className="text-sm font-semibold text-green-600 mb-2">
            Available Time
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="px-4 py-2 border rounded-lg"
            />

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Break Time */}
        <div>
          <h4 className="text-sm font-semibold text-red-600 mb-2">
            Break Time (Optional)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={breakStart}
              onChange={(e) => setBreakStart(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />

            <input
              type="time"
              value={breakEnd}
              onChange={(e) => setBreakEnd(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Availability"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}

      {success && (
        <p className="text-green-600 text-sm mt-3">{success}</p>
      )}
    </div>
  );
}

export default Availability;
