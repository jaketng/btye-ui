// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import DiningHallsPage from "./pages/DiningHallsPage";
import PreferencesPage from "./pages/PreferencesPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import RecsPage from "./pages/RecsPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation(); // Get current location
  const navbarExcludedPaths = ["/login", "/"]; // Add "/" to exclude Navbar for WelcomePage
  const footerExcludedPaths = ["/login", "/"]; // Add "/" to exclude Footer for WelcomePage if needed

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Navbar */}
      {!navbarExcludedPaths.includes(location.pathname) && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} /> {/* Add WelcomePage */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/dining-halls"
            element={
              <PrivateRoute>
                <DiningHallsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <PrivateRoute>
                <PreferencesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-settings"
            element={
              <PrivateRoute>
                <UserSettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <PrivateRoute>
                <RecsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {/* Conditionally render Footer */}
      {!footerExcludedPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
