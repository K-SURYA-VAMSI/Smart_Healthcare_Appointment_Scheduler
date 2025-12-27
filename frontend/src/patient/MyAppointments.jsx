import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

function MyAppointments() {
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
  }, []);

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

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold">My Appointments</h3>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  Dr. {appt.doctorId.userId.name}
                </p>
                <p className="text-sm text-gray-600">
                  {appt.date} | {appt.timeSlot.startTime} – {appt.timeSlot.endTime}
                </p>
              </div>

              <button
                onClick={() => cancelAppointment(appt._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
