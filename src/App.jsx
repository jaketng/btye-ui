import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiningHallsPage from "./pages/DiningHallsPage";
import PreferencesPage from "./pages/PreferencesPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/dining-halls" element={<DiningHallsPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/user-settings" element={<UserSettingsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
