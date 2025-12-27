import { useState, useEffect } from "react";
import api from "../api/axios";
import CreateProfile from "./CreateProfile";
import Availability from "./Availability";

function DoctorDashboard() {
  const [hasProfile, setHasProfile] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const res = await api.get("/doctors/me");
      if (res.data) {
        setHasProfile(true);
      }
    } catch (err) {
      setHasProfile(false);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileCreated = () => {
    setProfileCreated(true);
    setTimeout(() => {
      setHasProfile(true);
      setProfileCreated(false);
    }, 700);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Doctor Dashboard 👨‍⚕️</h1>
          <p className="text-teal-100 text-lg">
            Manage your profile and set your availability
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Doctor Dashboard 👨‍⚕️</h1>
        <p className="text-teal-100 text-lg">
          Manage your profile and set your availability
        </p>
      </div>

      {!hasProfile && !profileCreated ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateProfile onProfileCreated={handleProfileCreated} />
          <Availability />
        </div>
      ) : profileCreated ? (
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-slide-out-left">
              <CreateProfile onProfileCreated={handleProfileCreated} />
            </div>
            <div className="lg:col-span-1">
              <Availability />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <Availability />
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
