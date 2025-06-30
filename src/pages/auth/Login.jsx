import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaUserPlus, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Supabase config
const API_URL = "https://ibblbpjrmcaimtbilpeh.supabase.co/rest/v1/login";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliYmxicGpybWNhaW10YmlscGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDk5MzYsImV4cCI6MjA2NDQ4NTkzNn0.-EyUJV7-zntpQorquExKu7eEi69Jmy4NsMYqPBvXLtc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!dataForm.username || !dataForm.password) {
      setError("Username dan password harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(API_URL, {
        headers,
        params: {
          username: `eq.${dataForm.username}`,
          password: `eq.${dataForm.password}`,
          select: "*",
        },
      });

      if (res.data.length > 0) {
        // Login berhasil
        window.location.href = "https://glowsphere-app.vercel.app/";
      } else {
        setError("Username atau password salah");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const message = err?.response?.data?.message || "Gagal login. Coba lagi nanti.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Welcome Back 👋</h2>

      {error && (
        <div className="bg-red-100 text-sm text-red-600 mb-4 p-3 rounded flex items-center">
          <BsFillExclamationDiamondFill className="mr-2" /> {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 text-sm text-gray-600 mb-4 p-3 rounded flex items-center">
          <ImSpinner2 className="mr-2 animate-spin" /> Please wait...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Admin1234"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </form>

      <div className="flex flex-col gap-3 mt-5">
        <button
          onClick={() => navigate("/forgot")}
          className="flex justify-center items-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg"
        >
          <FaKey /> Forgot Password
        </button>
        <button
          onClick={() => navigate("/register")}
          className="flex justify-center items-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
        >
          <FaUserPlus /> Create Account
        </button>
      </div>
    </div>
  );
}
