import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaUserPlus, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// ...imports
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      });

      if (res.status === 200) navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="you@example.com"
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
