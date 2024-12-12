import React, { useState, useEffect } from "react";
import RecommendedDiningHall from "../components/RecommendedDiningHall";
import RatingPopup from "../components/RatingPopup";

function RecsPage() {
  const [selectedFilter, setSelectedFilter] = useState("Breakfast");
  const [recommendedDiningHall, setRecommendedDiningHall] = useState(null);
  const [ratingMeal, setRatingMeal] = useState(null); // Tracks the selected meal to rate

  // Fetch recommendations when selectedFilter changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          "http://ec2-52-23-167-127.compute-1.amazonaws.com/recommend_special"
        );
        const data = await response.json();

        // Map selected filter to corresponding recommendation
        const recommendationKey = `${selectedFilter} recommendation`;
        const recData = data[recommendationKey];

        if (recData && recData.length > 0) {
          const mealOptions = recData.map((item) => ({
            stationName: item.line_type,
            foodName: item.food_item,
            rating: Math.floor(Math.random() * 5) + 1, // Example rating; replace with real rating data if available
          }));

          setRecommendedDiningHall({
            name: recData[0].dining_hall,
            mealOptions,
          });
        } else {
          setRecommendedDiningHall(null);
          alert("No recommendations available for the selected filter.");
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        alert("Error fetching recommendations. Please try again later.");
      }
    };

    fetchRecommendations();
  }, [selectedFilter]);

  const handleRateClick = (mealOption, stationName) => {
    // Similar to DiningHall's handleRateClick, we store the meal and its station name
    setRatingMeal({
      ...mealOption,
      stationName,
    });
  };

  const handleClosePopup = () => {
    setRatingMeal(null);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center">
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["Breakfast", "Lunch", "Dinner"].map((filter) => (
          <div
            key={filter}
            className={`cursor-pointer px-4 py-2 border border-primary rounded-lg ${
              selectedFilter === filter
                ? "bg-primary text-white"
                : "bg-base-200 text-primary"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-6 w-full max-w-4xl text-center">
        {recommendedDiningHall ? (
          <>
            <h2 className="text-2xl pb-6 font-bold text-gray-700">
              {`We recommend the ${selectedFilter.toLowerCase()} at ${recommendedDiningHall.name}`}
            </h2>
            <RecommendedDiningHall
              name={recommendedDiningHall.name}
              mealOptions={recommendedDiningHall.mealOptions}
              // Ensure that onRateClick passes both the mealOption and stationName, similar to DiningHall
              onRateClick={(mealOption) => handleRateClick(mealOption, mealOption.stationName)}
            />
          </>
        ) : (
          <h2 className="text-2xl font-bold text-gray-700">
            Select a meal to see recommendations.
          </h2>
        )}
      </div>

      {/* Rating Popup */}
      {ratingMeal && (
        <RatingPopup
          diningHall={recommendedDiningHall.name}
          mealOption={ratingMeal.foodName}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default RecsPage;
