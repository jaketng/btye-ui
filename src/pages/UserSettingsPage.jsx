import React from "react";
import { useNavigate } from "react-router-dom";

function UserSettingsPage() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Add any necessary logout logic here (e.g., clearing auth tokens)
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-6rem)] bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-3/4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Email Section */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Email:</span>
          </label>
          <div className="flex gap-4">
            <input
              type="email"
              value="email@email.com"
              className="input input-bordered flex-grow"
              disabled
            />
            <button className="btn btn-primary flex-shrink-0 w-36">
              Update Email
            </button>
          </div>
        </div>

        {/* Password Section */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Password:
            </span>
          </label>
          <div className="flex gap-4">
            <input
              type="password"
              value="**********"
              className="input input-bordered flex-grow"
              disabled
            />
            <button className="btn btn-primary flex-shrink-0 w-36">
              Update Password
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-error w-full"
          onClick={handleLogout} // Add logout handler
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserSettingsPage;
