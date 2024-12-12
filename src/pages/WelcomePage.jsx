import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-300 text-white">
      {/* Centered Content */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">WELCOME TO</h1>
        <h1 className="text-8xl font-bold mb-10">BYTE</h1>
        <p className="text-lg mb-12 px-8 max-w-xl mx-auto">
          Byte is an AI-powered meal planning app designed specifically for Columbia students. 
          It personalizes food recommendations by analyzing your preferences and dining history 
          while pulling real-time menus from Columbia dining halls. Byte makes it simple to 
          discover the perfect meal every day, tailored just for you.
        </p>
        <button
          onClick={goToLogin}
          className="btn btn-primary px-6 py-3 text-blue-500 bg-white font-bold rounded-lg shadow-lg hover:bg-gray-100"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
