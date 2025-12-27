import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./common/Navbar";
import DoctorDashboard from "./doctor/DoctorDashboard";
import PatientDashboard from "./patient/PatientDashboard";

function App() {
  const { user, loading, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onSwitch={() => setShowSignup(true)} />
    );
  }

  return (
    <>
      <Navbar user={user} logout={logout} />
      <main className="p-6">
        {user.role === "doctor" ? (
          <DoctorDashboard />
        ) : (
          <PatientDashboard />
        )}
      </main>
    </>
  );
}

export default App;
