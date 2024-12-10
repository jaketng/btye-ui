import axios from "axios";

const API_URL =
  "https://menu-data-api2-656384740055.us-central1.run.app/api/objects";
const API_KEY = "bTyZuR2uz0_KKd_Aw_vANoGaSaP-SxXmDQV1WmCfmyQ";

/**
 * Fetch dining data from the backend and structure it for the frontend.
 * @param {string|null} filter - Optional filter for meal times (e.g., "breakfast", "lunch").
 * @returns {Promise<Object[]>} - The structured dining hall data or an empty array if an error occurs.
 */
export async function fetchDiningData(filter = null) {
  const url =
    "https://menu-data-api2-656384740055.us-central1.run.app/api/objects";
  const apiKey = "bTyZuR2uz0_KKd_Aw_vANoGaSaP-SxXmDQV1WmCfmyQ";

  const headers = {
    "X-API-Key": apiKey,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();

    console.log("Raw Data:", data);

    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toISOString().split("T")[0]; // e.g., "2024-12-10"

    // Filter meals for today and the selected filter
    const filteredData = data.filter((meal) => {
      const mealDate = new Date(meal.date).toISOString().split("T")[0];
      return (
        mealDate === today &&
        (filter ? meal.meal_time.toLowerCase() === filter.toLowerCase() : true)
      );
    });

    console.log("Filtered Data:", filteredData);

    // Group meals by dining hall
    const groupedByDiningHall = {};
    filteredData.forEach((meal) => {
      if (!groupedByDiningHall[meal.dining_hall]) {
        groupedByDiningHall[meal.dining_hall] = [];
      }
      groupedByDiningHall[meal.dining_hall].push({
        stationName: meal.meal_time,
        foodName: meal.food_item,
      });
    });

    console.log("Grouped Data by Dining Hall:", groupedByDiningHall);

    return Object.entries(groupedByDiningHall).map(
      ([diningHall, mealOptions]) => ({
        name: diningHall,
        mealOptions,
      })
    );
  } catch (error) {
    console.error("Error fetching dining data:", error);
    return [];
  }
}
