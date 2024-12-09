import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "signup"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      activeTab === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }
    // Redirect to the recommendations page
    navigate("/recommendations");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="w-1/2 bg-blue-300 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-5xl font-bold mb-6">WELCOME TO BYTE</h1>
        <p className="text-lg mb-10 max-w-96">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
        {/* Placeholder Icons */}
        <div className="flex justify-around w-full mt-6">
          <div className="w-16 h-16 bg-white rounded-full"></div>
          <div className="w-16 h-16 bg-white rounded-full"></div>
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-3/4 max-w-md">
          {/* Tabs for Login and Sign Up */}
          <div className="flex justify-between mb-6 border-b pb-2">
            <button
              className={`w-1/2 text-center pb-2 ${
                activeTab === "login"
                  ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`w-1/2 text-center pb-2 ${
                activeTab === "signup"
                  ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field for Sign Up */}
            {activeTab === "signup" && (
              <div className="form-control mb-6">
                <label className="label text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              {activeTab === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
