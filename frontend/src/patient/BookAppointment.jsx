import { useEffect, useState } from "react";
import api from "../api/axios";
import AISlots from "./AISlots";

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    api.get("/doctors")
      .then(res => setDoctors(res.data))
      .catch(() => setDoctors([]));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Book Appointment</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">-- Choose Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.userId.name} – {doc.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* AI Slots */}
      {selectedDoctor && date && (
        <AISlots doctorId={selectedDoctor} date={date} />
      )}
    </div>
  );
}

export default BookAppointment;
