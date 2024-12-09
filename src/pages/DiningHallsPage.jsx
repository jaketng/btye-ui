import React from "react";
import DiningHall from "../components/DiningHall";

const diningHalls = [
  {
    name: "John Jay",
    rating: 4, // Correctly defined rating
    mealOptions: [
      { stationName: "Grill", foodName: "Grilled Chicken", rating: 3 },
      { stationName: "Main Line", foodName: "Mashed Potatoes", rating: 4 },
      { stationName: "Action Station", foodName: "Stir Fry", rating: 5 },
    ],
  },
  {
    name: "Ferris",
    rating: 5,
    mealOptions: [
      { stationName: "Pasta Station", foodName: "Spaghetti", rating: 4 },
      { stationName: "Grill", foodName: "Cheeseburger", rating: 5 },
      { stationName: "Desserts", foodName: "Brownies", rating: 4 },
    ],
  },
  {
    name: "JJ's",
    rating: 3,
    mealOptions: [
      { stationName: "Main Line", foodName: "Pepperoni Pizza", rating: 5 },
      { stationName: "Grill", foodName: "Fries", rating: 4 },
      { stationName: "Ice Cream", foodName: "Vanilla Sundae", rating: 3 },
    ],
  },
  {
    name: "Chef Mike's",
    rating: 4,
    mealOptions: [
      { stationName: "Seafood", foodName: "Grilled Salmon", rating: 5 },
      { stationName: "Salads", foodName: "Caesar Salad", rating: 4 },
      { stationName: "Desserts", foodName: "Tiramisu", rating: 5 },
    ],
  },
  {
    name: "Hewitt",
    rating: 2,
    mealOptions: [
      { stationName: "Grill", foodName: "BBQ Ribs", rating: 3 },
      { stationName: "Vegetarian", foodName: "Veggie Stir Fry", rating: 2 },
      { stationName: "Soups", foodName: "Tomato Bisque", rating: 4 },
    ],
  },
];

function AllMealsPage() {
  const columns = [[], [], []];
  diningHalls.forEach((hall, index) => {
    columns[index % 3].push(hall);
  });

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="space-y-4">
            {column.map((hall) => (
              <DiningHall
                key={hall.name}
                name={hall.name}
                rating={hall.rating} // Pass the correct rating
                mealOptions={hall.mealOptions}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMealsPage;
