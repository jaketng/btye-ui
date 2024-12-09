import React, { useState } from "react";
import MealOption from "./MealOption";
import RatingPopup from "./RatingPopup";

function DiningHall({ name, rating, mealOptions }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRateClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleClosePopup = () => {
    setSelectedMeal(null);
  };

  const handleRatingSubmit = (rating) => {
    console.log(`Rated ${selectedMeal.foodName} at ${name}: ${rating} stars`);
    handleClosePopup();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      {/* Dining Hall Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-md ${
                  star <= rating ? "text-primary" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button className="btn btn-sm" onClick={toggleExpand}>
          {isExpanded ? "Close" : "Expand"}
        </button>
      </div>

      {/* Meal Options */}
      {isExpanded && (
        <div>
          {mealOptions.map((meal) => (
            <MealOption
              key={meal.foodName}
              stationName={meal.stationName}
              foodName={meal.foodName}
              rating={meal.rating} // Pass rating for meal options
              onRate={() => handleRateClick(meal)}
            />
          ))}
        </div>
      )}

      {/* Rating Popup for Meals */}
      {selectedMeal && (
        <RatingPopup
          diningHall={name}
          mealOption={selectedMeal.foodName}
          onSubmit={handleRatingSubmit}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default DiningHall;
