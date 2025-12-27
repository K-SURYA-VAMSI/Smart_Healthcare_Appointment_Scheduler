import BookAppointment from "./BookAppointment";
import MyAppointments from "./MyAppointments";

function PatientDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Patient Dashboard</h2>

      <BookAppointment />
      <MyAppointments />
    </div>
  );
}

export default PatientDashboard;
