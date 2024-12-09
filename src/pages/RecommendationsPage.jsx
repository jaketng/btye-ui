import React, { useState } from "react";
import DiningHall from "../components/DiningHall";

function RecommendationsPage() {
  // State to track whether a recommendation has been made
  const [hasRec, setHasRec] = useState(false);

  // Dummy data for the recommended dining hall
  const recommendedDiningHall = {
    name: "John Jay",
    mealOptions: [
      { stationName: "Grill", foodName: "Grilled Chicken", rating: 4 },
      { stationName: "Main Line", foodName: "Mashed Potatoes", rating: 3 },
      { stationName: "Action Station", foodName: "Stir Fry", rating: 5 },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-6">
      {/* Stage 1: Before the Recommendation */}
      {!hasRec && (
        <div className="flex flex-col items-center justify-center space-y-6">
          <h1 className="text-3xl font-bold text-center">
            Get Your Dining Recommendation
          </h1>
          <button className="btn btn-primary" onClick={() => setHasRec(true)}>
            Make a Recommendation
          </button>
        </div>
      )}

      {/* Stage 2: After the Recommendation */}
      {hasRec && (
        <div className="flex justify-center">
          <DiningHall
            name={recommendedDiningHall.name}
            mealOptions={recommendedDiningHall.mealOptions}
          />
        </div>
      )}
    </div>
  );
}

export default RecommendationsPage;
