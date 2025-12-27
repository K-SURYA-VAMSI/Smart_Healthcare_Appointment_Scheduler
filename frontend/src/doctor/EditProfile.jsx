import { useState, useEffect } from "react";
import api from "../api/axios";

function EditProfile({ onBack }) {
  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    consultationDuration: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/doctors/me");
      if (res.data) {
        setForm({
          specialization: res.data.specialization || "",
          experience: res.data.experience || "",
          consultationDuration: res.data.consultationDuration || ""
        });
      }
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.put("/doctors/me", {
        specialization: form.specialization,
        experience: Number(form.experience),
        consultationDuration: Number(form.consultationDuration)
      });

      setSuccess("Profile updated successfully");
      setTimeout(() => {
        if (onBack) {
          onBack();
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-100 p-3 rounded-xl">
              <span className="text-3xl">👨‍⚕️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Doctor Profile
            </h2>
          </div>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
            >
              <span>←</span> Back
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🎓 Specialization
            </label>
            <input
              name="specialization"
              placeholder="e.g., Cardiologist, Neurologist, Pediatrician"
              value={form.specialization}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⏱️ Experience (Years)
            </label>
            <input
              name="experience"
              type="number"
              placeholder="Years of experience"
              value={form.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⏰ Consultation Duration (Minutes)
            </label>
            <input
              name="consultationDuration"
              type="number"
              placeholder="e.g., 30, 45, 60"
              value={form.consultationDuration}
              onChange={handleChange}
              required
              min="15"
              step="15"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Save Changes
                </>
              )}
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700 font-medium">⚠️ {error}</p>
          </div>
        )}

        {success && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
            <p className="text-green-700 font-medium">✅ {success}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;

