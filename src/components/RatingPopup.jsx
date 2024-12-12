import React, { useState } from "react";
import { submitRating } from '../services/ratingService';

function RatingPopup({ diningHall, mealOption, onClose }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    if (selectedRating > 0) {
      try {
        setIsSubmitting(true);
        await submitRating(diningHall, mealOption, selectedRating);
        onClose();
      } catch (error) {
        console.error("Error submitting rating:", error);
        alert("Failed to submit rating. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please select a rating!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-blue-300 text-white rounded-lg p-8 w-96 shadow-lg relative">
        <button 
          className="absolute top-4 right-4 text-2xl" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          ×
        </button>

        <h2 className="text-lg font-bold mb-4">
          Help us learn your preferences
        </h2>

        <div className="mb-6">
          <p className="text-md font-bold">{diningHall}</p>
          <p className="text-md">{mealOption}</p>
        </div>

        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-4xl mx-1 ${
                star <= selectedRating ? "text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => handleStarClick(star)}
              disabled={isSubmitting}
            >
              ★
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary w-full bg-white text-blue-300 hover:bg-gray-200 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default RatingPopup;