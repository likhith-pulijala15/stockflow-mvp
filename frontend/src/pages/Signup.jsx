import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    organizationName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", formData);

      alert("Signup successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 border rounded">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>

        <input
          type="text"
          name="organizationName"
          placeholder="Organization Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2 w-full">Signup</button>

        <p className="mt-3">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
