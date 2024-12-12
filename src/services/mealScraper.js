import axios from "axios";

const API_URL = "https://menu-data-api2-656384740055.us-central1.run.app/api/objects";
const API_KEY = "bTyZuR2uz0_KKd_Aw_vANoGaSaP-SxXmDQV1WmCfmyQ";

/**
 * Fetch dining data from the backend and structure it for the frontend.
 * @param {string|null} filter - Optional filter for meal times (e.g., "breakfast", "lunch", "dinner").
 * @returns {Promise<Object[]>} - The structured dining hall data or an empty array if an error occurs.
 */
export async function fetchDiningData(filter = null) {
  const headers = {
    "X-API-Key": API_KEY,
  };

  try {
    const response = await axios.get(API_URL, { headers });
    const data = Array.isArray(response.data) ? response.data : [];

    console.log("Raw Data:", data);

    // Filter meals for the selected meal time
    const filteredData = data.filter((meal) => {
      // Only filter by meal_time if a filter is provided
      return filter ? meal.meal_time.toLowerCase() === filter.toLowerCase() : true;
    });

    console.log("Filtered Data:", filteredData);

    // Group meals by dining hall and line type
    const groupedByDiningHall = {};
    filteredData.forEach((meal) => {
      const { dining_hall, line_type, food_item, meal_time } = meal;

      // Initialize dining hall if it doesn't exist
      if (!groupedByDiningHall[dining_hall]) {
        groupedByDiningHall[dining_hall] = {
          name: dining_hall,
          stations: {}
        };
      }
      
      // Initialize station (line_type) if it doesn't exist
      if (!groupedByDiningHall[dining_hall].stations[line_type]) {
        groupedByDiningHall[dining_hall].stations[line_type] = [];
      }

      // Add food item to the appropriate station
      groupedByDiningHall[dining_hall].stations[line_type].push({
        name: food_item,
        mealTime: meal_time
      });
    });

    console.log("Grouped Data:", groupedByDiningHall);

    // Convert to final array format
    const formattedData = Object.values(groupedByDiningHall).map(diningHall => ({
      name: diningHall.name,
      stations: Object.entries(diningHall.stations).map(([stationName, items]) => ({
        name: stationName,
        items: items
      }))
    }));

    console.log("Formatted Data:", formattedData);
    return formattedData;

  } catch (error) {
    console.error("Error fetching dining data:", error);
    return [];
  }
}