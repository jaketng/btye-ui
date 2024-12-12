import React, { useState, useEffect } from "react";
import PastRating from "../components/PastRating";
import RatingPopup from "../components/RatingPopup";
import { auth, db } from "../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { submitRating } from '../services/ratingService'; // Existing import

function PreferenceSettingsPage() {
  const [pastRatings, setPastRatings] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    async function fetchUserRatings() {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userRatingsRef = doc(db, 'userRatings', userId);
        const userRatingsDoc = await getDoc(userRatingsRef);
        
        if (userRatingsDoc.exists()) {
          const data = userRatingsDoc.data();
          const ratings = data.ratings || {};
          
          // Transform ratings object into an array that matches the PastRating component props
          const ratingsArray = Object.keys(ratings).map((mealId) => ({
            stationName: ratings[mealId].diningHall,
            foodName: ratings[mealId].mealOption,
            rating: ratings[mealId].averageRating // Using the average rating as a display value
          }));

          setPastRatings(ratingsArray);
        } else {
          // If no document, user has no past ratings
          setPastRatings([]);
        }
      } else {
        // If user is not logged in, maybe set to empty or handle differently
        setPastRatings([]);
      }
    }

    fetchUserRatings();
  }, []);

  // Handle edit button click - triggers the rating popup
  const handleEdit = (foodName) => {
    const mealToEdit = pastRatings.find(
      (rating) => rating.foodName === foodName
    );
    setSelectedMeal(mealToEdit);
  };

  // Handle rating submission (when popup is closed)
  // Here we call the submitRating service to update Firestore
  const handleRatingSubmit = async (newRating) => {
    try {
      await submitRating(selectedMeal.stationName, selectedMeal.foodName, newRating);
      
      // Update the local state to reflect the new rating
      setPastRatings((prevRatings) =>
        prevRatings.map((rating) =>
          rating.foodName === selectedMeal.foodName
            ? { ...rating, rating: newRating }
            : rating
        )
      );
      setSelectedMeal(null);
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("There was an error updating your rating. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Past Ratings Section */}
        <div className="col-span-1 bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Past Ratings</h2>
          <div className="space-y-4">
            {pastRatings.length > 0 ? (
              pastRatings.map((rating, index) => (
                <PastRating
                  key={index}
                  stationName={rating.stationName}
                  foodName={rating.foodName}
                  rating={rating.rating}
                  onEdit={() => handleEdit(rating.foodName)}
                />
              ))
            ) : (
              <p>No past ratings found.</p>
            )}
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
          onClose={() => setSelectedMeal(null)}
          onSubmit={handleRatingSubmit}  // Pass the handleRatingSubmit to update Firestore
        />
      )}
    </div>
  );
}

export default PreferenceSettingsPage;
