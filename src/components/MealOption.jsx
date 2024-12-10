import React from "react";

function MealOption({ foodName, rating, onRate }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        {/* Increased text size for meal name */}
        <p className="text-base font-medium text-gray-800">{foodName}</p>
      </div>
      <div className="flex items-center">
        {/* Ratings */}
        <div className="rating">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={`${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                } text-lg`}
              >
                ★
              </span>
            ))}
        </div>
        {/* Consistent button size */}
        <button onClick={onRate} className="btn btn-xs btn-primary ml-4">
          Rate
        </button>
      </div>
    </div>
  );
}

export default MealOption;
