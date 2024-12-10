import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DiningHallsPage from "./pages/DiningHallsPage";
import PreferencesPage from "./pages/PreferencesPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import RecsPage from "./pages/RecsPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component

function App() {
  const location = useLocation(); // Works because App is wrapped in Router
  const navbarExcludedPaths = ["/login"];
  const footerExcludedPaths = ["/login"]; // Exclude footer from specific paths if needed

  return (
    <div className="flex flex-col min-h-screen">
      {!navbarExcludedPaths.includes(location.pathname) && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dining-halls" element={<DiningHallsPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/user-settings" element={<UserSettingsPage />} />
          <Route path="/recommendations" element={<RecsPage />} />
        </Routes>
      </main>
      {!footerExcludedPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
