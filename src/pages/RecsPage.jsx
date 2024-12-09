import React, { useState } from "react";
import RecommendedDiningHall from "../components/RecommendedDiningHall";

function RecsPage() {
  // State to track the recommendation and selected filter
  const [hasRec, setHasRec] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  // Dummy data for the recommended dining hall
  const recommendedDiningHall = {
    name: "John Jay",
    mealOptions: [
      { stationName: "Grill", foodName: "Grilled Chicken", rating: 4 },
      { stationName: "Main Line", foodName: "Mashed Potatoes", rating: 3 },
      { stationName: "Action Station", foodName: "Stir Fry", rating: 5 },
    ],
  };

  // Handle option selection
  const handleOptionClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (selectedFilter) setHasRec(true);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex min-h-[calc(100vh-6rem)] items-center justify-center">
      {/* Stage 1: Before the Recommendation */}
      {!hasRec && (
        <div className="text-center space-y-8 w-full max-w-lg">
          {/* BYTE name */}
          <h1 className="text-7xl font-extrabold text-primary">BYTE</h1>

          {/* Filter Options */}
          <div className="flex justify-center space-x-4">
            {["Open Now", "Breakfast", "Lunch", "Dinner"].map((filter) => (
              <div
                key={filter}
                className={`cursor-pointer px-4 py-2 border border-primary rounded-lg ${
                  selectedFilter === filter
                    ? "bg-primary text-white"
                    : "bg-base-200 text-primary"
                }`}
                onClick={() => handleOptionClick(filter)}
              >
                {filter}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            className="btn bg-primary border-primary hover:bg-primary-focus hover:border-primary-focus text-white"
            onClick={handleSubmit}
            disabled={!selectedFilter}
          >
            Submit
          </button>
        </div>
      )}

      {/* Stage 2: After the Recommendation */}
      {hasRec && (
        <div className="space-y-6 w-full max-w-4xl">
          {/* Recommendation Heading */}
          <h2 className="text-3xl font-bold text-gray-700">
            Based on our Machine Learning Algorithm, we recommend...
          </h2>

          {/* Recommended Dining Hall */}
          <RecommendedDiningHall
            name={recommendedDiningHall.name}
            mealOptions={recommendedDiningHall.mealOptions}
          />
        </div>
      )}
    </div>
  );
}

export default RecsPage;
