import React, { useState } from "react";
import MealOption from "./MealOption";

function DiningHall({ name, rating, mealOptions }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card bg-base-100 shadow-md mb-4">
      <div
        className="card-header flex justify-between items-center cursor-pointer p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          {/* Star Ratings */}
          <div className="flex items-center space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`mask mask-star-2 w-5 h-5 ${
                  star <= rating ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <button className="btn btn-sm">{isOpen ? "Close" : "Expand"}</button>
      </div>
      {isOpen && (
        <div className="card-body p-4">
          {mealOptions.map((meal, index) => (
            <MealOption key={index} {...meal} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DiningHall;
