import { useEffect, useState } from "react";
import api from "../api/axios";
import AISlots from "./AISlots";

function BookAppointment({ onAppointmentBooked }) {
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-teal-100 p-3 rounded-xl">
            <span className="text-2xl">📅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              👨‍⚕️ Select Doctor
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white"
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.userId.name} – {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📆 Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {selectedDoctor && date && (
        <AISlots doctorId={selectedDoctor} date={date} onAppointmentBooked={onAppointmentBooked} />
      )}
    </div>
  );
}

export default BookAppointment;
