import React from "react";
import MealOption from "./MealOption";

function RecommendedDiningHall({ name, mealOptions }) {
  return (
    <div className="card bg-base-100 shadow-md w-full max-w-4xl mx-auto">
      <div className="card-header text-center p-4">
        <h2 className="text-3xl font-bold">{name}</h2>
      </div>
      <div className="card-body p-6">
        {mealOptions.map((meal, index) => (
          <MealOption key={index} {...meal} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedDiningHall;
