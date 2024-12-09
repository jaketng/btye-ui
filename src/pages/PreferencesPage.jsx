import React, { useState } from "react";
import PastRating from "../components/PastRating";
import RatingPopup from "../components/RatingPopup";

function PreferenceSettingsPage() {
  // State for past ratings
  const [pastRatings, setPastRatings] = useState([
    { stationName: "Grill", foodName: "Grilled Chicken", rating: 4 },
    { stationName: "Main Line", foodName: "Mashed Potatoes", rating: 3 },
    { stationName: "Action Station", foodName: "Stir Fry", rating: 5 },
  ]);

  // State for selected meal option (used for the popup)
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Handle edit button click
  const handleEdit = (foodName) => {
    const mealToEdit = pastRatings.find(
      (rating) => rating.foodName === foodName
    );
    setSelectedMeal(mealToEdit);
  };

  // Handle rating submission
  const handleRatingSubmit = (newRating) => {
    setPastRatings((prevRatings) =>
      prevRatings.map((rating) =>
        rating.foodName === selectedMeal.foodName
          ? { ...rating, rating: newRating }
          : rating
      )
    );
    setSelectedMeal(null); // Close popup after submission
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Past Ratings Section */}
        <div className="col-span-1 bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Past Ratings</h2>
          <div className="space-y-4">
            {pastRatings.map((rating, index) => (
              <PastRating
                key={index}
                stationName={rating.stationName}
                foodName={rating.foodName}
                rating={rating.rating}
                onEdit={() => handleEdit(rating.foodName)}
              />
            ))}
          </div>
        </div>

        {/* Adjust Preferences Section */}
        <div className="col-span-2 bg-base-100 shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Adjust Preferences</h2>
          <form className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Preferred Cuisine</span>
              </label>
              <select className="select select-bordered w-full">
                <option>Italian</option>
                <option>Mexican</option>
                <option>Asian</option>
                <option>American</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Dietary Restrictions</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="e.g., Vegetarian, Gluten-Free"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Favorite Ingredients</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Chicken, Broccoli"
                className="input input-bordered w-full"
              />
            </div>

            <button className="btn btn-primary w-full">Save Preferences</button>
          </form>
        </div>
      </div>

      {/* Rating Popup */}
      {selectedMeal && (
        <RatingPopup
          diningHall={selectedMeal.stationName}
          mealOption={selectedMeal.foodName}
          onSubmit={handleRatingSubmit}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}

export default PreferenceSettingsPage;
