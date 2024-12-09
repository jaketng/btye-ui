import React from "react";

function UserSettingsPage() {
  return (
    <div className="flex justify-center items-center flex min-h-[calc(100vh-6rem)] bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-3/4 max-w-md">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {/* Email Section */}
        <div className="form-control mb-4">
          <label className="label text-gray-600">Email:</label>
          <div className="flex items-center">
            <input
              type="email"
              value="email@email.com"
              className="input input-bordered w-full mr-2"
              disabled
            />
            <button className="btn btn-primary">Update Email</button>
          </div>
        </div>

        {/* Password Section */}
        <div className="form-control mb-6">
          <label className="label text-gray-600">Password:</label>
          <div className="flex items-center">
            <input
              type="password"
              value="**********"
              className="input input-bordered w-full mr-2"
              disabled
            />
            <button className="btn btn-primary">Update Password</button>
          </div>
        </div>

        {/* Logout Button */}
        <button className="btn btn-error w-full">Logout</button>
      </div>
    </div>
  );
}

export default UserSettingsPage;
