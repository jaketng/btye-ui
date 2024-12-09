import React, { useState } from "react";

function RatingPopup({ diningHall, mealOption, onSubmit, onClose }) {
  const [selectedRating, setSelectedRating] = useState(0);

  // Handle star click
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedRating > 0) {
      onSubmit(selectedRating); // Pass rating back to parent
      onClose(); // Close the popup
    } else {
      alert("Please select a rating!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-blue-300 text-white rounded-lg p-8 w-96 shadow-lg relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold mb-4">
          Help us learn your preferences
        </h2>

        {/* Dining Hall and Meal Info */}
        <div className="mb-6">
          <p className="text-md font-bold">{diningHall}</p>
          <p className="text-md">{mealOption}</p>
        </div>

        {/* Stars for Rating */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-4xl mx-1 ${
                star <= selectedRating ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-primary w-full bg-white text-blue-300 hover:bg-gray-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default RatingPopup;
