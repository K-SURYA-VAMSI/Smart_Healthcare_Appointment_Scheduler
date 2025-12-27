import { useState } from "react";
import BookAppointment from "./BookAppointment";
import MyAppointments from "./MyAppointments";

function PatientDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAppointmentBooked = () => {
    // Trigger refresh by updating the trigger state
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
        <p className="text-teal-100 text-lg">
          Book your appointments with AI-powered slot suggestions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BookAppointment onAppointmentBooked={handleAppointmentBooked} />
        </div>
        <div className="lg:col-span-1">
          <MyAppointments refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
