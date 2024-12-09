import React from "react";

function PastRating({ stationName, foodName, rating, onEdit }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Meal Info */}
        <div>
          <p className="text-lg font-bold">{foodName}</p>
          <p className="text-sm text-gray-500">{stationName}</p>
        </div>

        {/* Stars and Edit Button */}
        <div className="flex items-center space-x-4">
          {/* Stars */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-lg ${
                  star <= rating ? "text-primary" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Edit Button */}
          <button className="btn btn-xs btn-primary" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
      <hr className="border-gray-300 mt-4" />
    </div>
  );
}

export default PastRating;
