import { useState } from "react";
import api from "../api/axios";

function CreateProfile({ onProfileCreated }) {
  const [form, setForm] = useState({
    specialization: "",
    experience: "",
    consultationDuration: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setLoading(true);

    try {
      await api.post("/doctors", {
        specialization: form.specialization,
        experience: Number(form.experience),
        consultationDuration: Number(form.consultationDuration)
      });

      setSuccess("Doctor profile created successfully");
      setForm({
        specialization: "",
        experience: "",
        consultationDuration: ""
      });
      
      // Notify parent component
      if (onProfileCreated) {
        setTimeout(() => {
          onProfileCreated();
        }, 500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-xl">
          <span className="text-3xl">👨‍⚕️</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">
          Create Doctor Profile
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Profile...
            </>
          ) : (
            <>
              <span>✅</span>
              Create Profile
            </>
          )}
        </button>
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
  );
}

export default CreateProfile;
