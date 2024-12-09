import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-blue-300 shadow-lg h-20 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center ml-4">
        <a className="text-3xl text-white font-bold normal-case">BYTE</a>
      </div>

      {/* Center Section */}
      <div className="flex space-x-8">
        <NavLink
          to="/recommendations"
          className={({ isActive }) =>
            `text-white ${
              isActive
                ? "underline decoration-2 decoration-white"
                : "no-underline"
            }`
          }
          style={{
            color: "white", // Keep text color white
            background: "transparent", // No background
          }}
        >
          Recs
        </NavLink>
        <NavLink
          to="/dining-halls"
          className={({ isActive }) =>
            `text-white ${
              isActive
                ? "underline decoration-2 decoration-white"
                : "no-underline"
            }`
          }
          style={{
            color: "white", // Keep text color white
            background: "transparent", // No background
          }}
        >
          All Meals
        </NavLink>
        <NavLink
          to="/preferences"
          className={({ isActive }) =>
            `text-white ${
              isActive
                ? "underline decoration-2 decoration-white"
                : "no-underline"
            }`
          }
          style={{
            color: "white", // Keep text color white
            background: "transparent", // No background
          }}
        >
          Preference Settings
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="flex items-center mr-4">
        <NavLink
          to="/user-settings"
          className={({ isActive }) =>
            `text-white ${
              isActive
                ? "underline decoration-2 decoration-white"
                : "no-underline"
            }`
          }
          style={{
            color: "white", // Keep text color white
            background: "transparent", // No background
          }}
        >
          Account
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
