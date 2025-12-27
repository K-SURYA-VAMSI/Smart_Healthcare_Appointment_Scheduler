import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

function MyAppointments({ refreshTrigger }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/appointments/my`);
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refreshTrigger]); // Refresh whenever refreshTrigger changes

  const cancelAppointment = async (id) => {
    setError("");
    setSuccess("");

    try {
      await api.delete(`/appointments/${id}`);
      setSuccess("Appointment cancelled successfully");
      fetchAppointments(); // refresh list
    } catch (err) {
      setError(err.response?.data?.message || "Cancellation failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent mb-3"></div>
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-xl">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">My Appointments</h3>
      </div>

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

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <span className="text-5xl mb-3 block">📅</span>
          <p className="text-gray-600 font-medium">No appointments scheduled</p>
          <p className="text-gray-400 text-sm mt-1">Book your first appointment above</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all duration-200"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-teal-500 p-2 rounded-lg flex-shrink-0">
                      <span className="text-white text-lg">👨‍⚕️</span>
                    </div>
                    <p className="font-bold text-gray-800 text-lg truncate">
                      Dr. {appt.doctorId.userId.name}
                    </p>
                  </div>
                  <div className="ml-11 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📅</span>
                      <span className="font-medium text-sm">
                        {new Date(appt.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>🕐</span>
                      <span className="font-medium text-sm">{appt.timeSlot.startTime} – {appt.timeSlot.endTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
