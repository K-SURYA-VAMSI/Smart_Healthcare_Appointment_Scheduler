import { useState } from "react";
import api from "../api/axios";

function CreateProfile() {
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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">
        Create Doctor Profile
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="specialization"
          placeholder="Specialization (e.g., Cardiologist)"
          value={form.specialization}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="experience"
          type="number"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="consultationDuration"
          type="number"
          placeholder="Consultation Duration (minutes)"
          value={form.consultationDuration}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Profile"}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-3">{error}</p>
      )}

      {success && (
        <p className="text-green-600 text-sm mt-3">{success}</p>
      )}
    </div>
  );
}

export default CreateProfile;
