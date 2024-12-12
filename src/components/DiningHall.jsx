import React, { useState, useEffect } from "react";
import MealOption from "./MealOption";
import RatingPopup from "./RatingPopup";
import { getGlobalMealRating, generateMealId } from "../services/ratingService";

function DiningHall({ name, stations = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealRatings, setMealRatings] = useState({});

  // Fetch ratings for all meals in this dining hall
  useEffect(() => {
    const fetchMealRatings = async () => {
      const ratings = {};
      for (const station of stations) {
        for (const item of station.items) {
          const mealId = generateMealId(name, item.name);
          try {
            const rating = await getGlobalMealRating(mealId);
            if (rating) {
              ratings[mealId] = rating;
            }
          } catch (error) {
            console.error(`Error fetching rating for ${item.name}:`, error);
          }
        }
      }
      setMealRatings(ratings);
    };

    if (isExpanded) {
      fetchMealRatings();
    }
  }, [isExpanded, name, stations]);

  // Function to deduplicate items across stations
  const getUniqueStations = (stations) => {
    const seenItems = new Set();

    return stations
      .map((station) => {
        const uniqueItems = station.items.filter((item) => {
          const itemKey = `${item.name}-${item.mealTime}`;
          if (seenItems.has(itemKey)) {
            return false;
          }
          seenItems.add(itemKey);
          return true;
        });

        return {
          ...station,
          items: uniqueItems.map((item) => ({
            ...item,
            rating: mealRatings[generateMealId(name, item.name)]?.averageRating || 0,
          })),
        };
      })
      .filter((station) => station.items.length > 0);
  };

  const uniqueStations = getUniqueStations(stations);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRateClick = (meal, stationName) => {
    setSelectedMeal({
      ...meal,
      stationName,
    });
  };

  const handleClosePopup = () => {
    setSelectedMeal(null);
  };

  // Calculate dining hall's average rating based on non-zero rated meals
  const calculateOverallRating = () => {
    const ratings = Object.values(mealRatings);
    // Filter out meals with zero rating
    const nonZeroRatings = ratings.filter((r) => r.averageRating > 0);

    if (nonZeroRatings.length === 0) return 0;

    const sum = nonZeroRatings.reduce((acc, curr) => acc + curr.averageRating, 0);
    return sum / nonZeroRatings.length;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-md ${
                  star <= calculateOverallRating() ? "text-primary" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button className="btn btn-sm" onClick={toggleExpand}>
          {isExpanded ? "Close" : "Expand"}
        </button>
      </div>

      {isExpanded && uniqueStations.length > 0 && (
        <div className="space-y-4">
          {uniqueStations.map((station, stationIndex) => (
            <div
              key={`${name}-${station.name}-${stationIndex}`}
              className="border-t pt-4 first:border-t-0 first:pt-0"
            >
              <h3 className="font-semibold text-gray-700 mb-2">{station.name}</h3>
              <div className="space-y-2 pl-4">
                {station.items.map((item, itemIndex) => (
                  <MealOption
                    key={`${name}-${station.name}-${item.name}-${itemIndex}`}
                    foodName={item.name}
                    rating={item.rating}
                    totalRatings={mealRatings[generateMealId(name, item.name)]?.totalRatings}
                    onRate={() => handleRateClick(item, station.name)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMeal && (
        <RatingPopup
          diningHall={name}
          mealOption={selectedMeal.name}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default DiningHall;
