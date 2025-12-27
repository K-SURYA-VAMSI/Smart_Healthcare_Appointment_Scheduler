import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./common/Navbar";
import DoctorDashboard from "./doctor/DoctorDashboard";
import PatientDashboard from "./patient/PatientDashboard";
import EditProfile from "./doctor/EditProfile";

function App() {
  const { user, loading, logout } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
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

  const handleNavbarClick = () => {
    if (user.role === "doctor") {
      setCurrentPage(currentPage === "dashboard" ? "edit-profile" : "dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar user={user} logout={logout} onRoleClick={handleNavbarClick} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === "doctor" ? (
          currentPage === "edit-profile" ? (
            <EditProfile onBack={() => setCurrentPage("dashboard")} />
          ) : (
            <DoctorDashboard />
          )
        ) : (
          <PatientDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
