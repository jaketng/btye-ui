import React, { useState, useEffect } from "react";
import DiningHall from "../components/DiningHall";
import { fetchDiningData } from "../services/mealScraper";

function DiningHallsPage() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("breakfast"); // Changed to lowercase to match API
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDiningData() {
      setIsLoading(true);
      const data = await fetchDiningData(selectedFilter);
      console.log("Fetched dining data:", data); // Debug log
      setDiningHalls(data);
      setIsLoading(false);
    }
    loadDiningData();
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter.toLowerCase());
  };

  // Divide dining halls into columns
  const columns = [[], [], []];
  diningHalls.forEach((hall, index) => {
    columns[index % 3].push(hall);
  });

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Filter Section */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-4 p-4 rounded-lg">
          {["Breakfast", "Lunch", "Dinner"].map((filter) => (
            <div
              key={filter}
              className={`cursor-pointer px-4 py-2 border border-blue-400 rounded-lg ${
                selectedFilter === filter.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-blue-400"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

      {/* Dining Halls Section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-blue-400 text-xl">Loading...</div>
        </div>
      ) : (
        <div className="flex gap-6">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6 flex-1">
              {column.map((hall) => (
                <DiningHall
                  key={hall.name}
                  name={hall.name}
                  rating={hall.rating || 0}
                  stations={hall.stations || []} // Changed from mealOptions to stations
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiningHallsPage;