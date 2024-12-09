import React from "react";

function MealOption({ stationName, foodName, rating, onRate }) {
  return (
    <div>
      <div className="flex justify-between items-center py-2">
        {/* Meal Option Info */}
        <div>
          <p className="text-base font-semibold">{stationName}</p>
          <p className="text-sm text-gray-500">{foodName}</p>
        </div>

        {/* Rating and Rate Button */}
        <div className="flex items-center space-x-2">
          {/* Display-Only Stars */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= rating ? "text-primary" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Rate Button */}
          <button className="btn btn-primary btn-xs" onClick={onRate}>
            Rate
          </button>
        </div>
      </div>
      {/* Separator Line */}
      <hr className="border-gray-300" />
    </div>
  );
}

export default MealOption;
