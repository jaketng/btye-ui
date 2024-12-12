import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase"; // Import Google sign-in function
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext

function LoginPage() {
  const { currentUser } = useAuth(); // Access current user
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "signup") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert("Sign-up successful!");
        navigate("/preferences");
      } catch (error) {
        console.error("Error signing up:", error);
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("Login successful!");
        navigate("/recommendations");
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Invalid email or password.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle(); // Call Google sign-in
      console.log("Signed in with Google:", user);
      alert(`Welcome, ${user.displayName}`);
      navigate("/recommendations"); // Redirect after successful Google sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const goToRecommendations = () => {
    navigate("/recommendations"); // Navigate to recommendations page
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-blue-300 flex flex-col justify-center text-white p-10">
        <h1 className="text-3xl font-bold mb-2 ml-12">WELCOME TO</h1>
        <h1 className="text-6xl font-bold mb-6 ml-12">BYTE</h1>
        <p className="text-lg mb-10 mx-12">
          Byte is an AI-powered meal planning app designed specifically for
          Columbia students. It personalizes food recommendations by analyzing
          your preferences and dining history while pulling real-time menus
          from Columbia dining halls. Byte makes it simple to discover the
          perfect meal every day, tailored just for you.
        </p>
      </div>

      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-3/4 max-w-md">
          {currentUser ? (
            <div className="space-y-4">
              <p>Welcome, {currentUser.displayName || currentUser.email}!</p>
              <button
                onClick={handleLogout}
                className="btn btn-primary w-full mt-4"
              >
                Logout
              </button>
              <button
                onClick={goToRecommendations}
                className="btn btn-secondary w-full mt-4"
              >
                Go to Recommendations
              </button>
            </div>
          ) : (
            <>
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

                <button type="submit" className="btn btn-primary w-full mb-4">
                  {activeTab === "login" ? "Login" : "Sign Up"}
                </button>
              </form>

              {activeTab === "login" && (
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-secondary w-full"
                >
                  Sign in with Google
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
