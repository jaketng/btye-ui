import { 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    serverTimestamp 
  } from 'firebase/firestore';
  import { auth, db } from "../firebase";
  
  // Generate consistent meal ID
  export function generateMealId(diningHall, mealOption) {
    return `${diningHall.toLowerCase().replace(/\s+/g, '-')}-${mealOption.toLowerCase().replace(/\s+/g, '-')}`;
  }
  
  // Submit a new rating
  export async function submitRating(diningHall, mealOption, rating) {
    if (!auth.currentUser) {
      throw new Error('User must be logged in to submit ratings');
    }
  
    const userId = auth.currentUser.uid;
    const mealId = generateMealId(diningHall, mealOption);
  
    try {
      // Update or create user rating aggregation
      await updateUserRating(userId, mealId, diningHall, mealOption, rating);
  
      // Update or create global rating aggregation
      await updateGlobalRating(mealId, diningHall, mealOption, rating);
  
      return { success: true };
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }
  
  // Update per-user aggregated rating for a meal
  async function updateUserRating(userId, mealId, diningHall, mealOption, rating) {
    const userRatingsRef = doc(db, 'userRatings', userId);
    const userDoc = await getDoc(userRatingsRef);
  
    let ratings = {};
    if (userDoc.exists()) {
      ratings = userDoc.data().ratings || {};
    }
  
    // If this meal doesn't exist yet, initialize it
    if (!ratings[mealId]) {
      ratings[mealId] = {
        diningHall,
        mealOption,
        totalRatings: 1,
        sumRatings: rating,
        averageRating: rating,
        lastUpdated: serverTimestamp()
      };
    } else {
      // Meal exists, update aggregates
      const currentData = ratings[mealId];
      const newTotal = currentData.totalRatings + 1;
      const newSum = currentData.sumRatings + rating;
      const newAverage = newSum / newTotal;
  
      ratings[mealId] = {
        ...currentData,
        totalRatings: newTotal,
        sumRatings: newSum,
        averageRating: newAverage,
        lastUpdated: serverTimestamp()
      };
    }
  
    // Write back to Firestore
    await setDoc(userRatingsRef, { ratings }, { merge: true });
  }
  
  // Update global ratings collection
  async function updateGlobalRating(mealId, diningHall, mealOption, rating) {
    const globalRatingRef = doc(db, 'globalRatings', mealId);
    const globalRatingDoc = await getDoc(globalRatingRef);
  
    if (!globalRatingDoc.exists()) {
      // Create new global rating document
      await setDoc(globalRatingRef, {
        diningHall,
        mealOption,
        totalRatings: 1,
        sumRatings: rating,
        averageRating: rating,
        lastUpdated: serverTimestamp()
      });
    } else {
      // Update existing global rating
      const currentData = globalRatingDoc.data();
      const newTotal = currentData.totalRatings + 1;
      const newSum = currentData.sumRatings + rating;
      const newAverage = newSum / newTotal;
  
      await updateDoc(globalRatingRef, {
        totalRatings: newTotal,
        sumRatings: newSum,
        averageRating: newAverage,
        lastUpdated: serverTimestamp()
      });
    }
  }
  
  // Get user's aggregated rating for a specific meal
  export async function getUserMealRating(mealId) {
    if (!auth.currentUser) return { averageRating: 0, totalRatings: 0, sumRatings: 0 };
  
    const userId = auth.currentUser.uid;
    const userRatingsRef = doc(db, 'userRatings', userId);
  
    try {
      const userRatingsDoc = await getDoc(userRatingsRef);
      if (!userRatingsDoc.exists()) return { averageRating: 0, totalRatings: 0, sumRatings: 0 };
  
      const ratings = userRatingsDoc.data().ratings || {};
      return ratings[mealId] || { averageRating: 0, totalRatings: 0, sumRatings: 0 };
    } catch (error) {
      console.error('Error getting user meal rating:', error);
      return { averageRating: 0, totalRatings: 0, sumRatings: 0 };
    }
  }
  
  // Get global rating for a specific meal (return defaults if not found)
  export async function getGlobalMealRating(mealId) {
    const globalRatingRef = doc(db, 'globalRatings', mealId);
  
    try {
      const globalRatingDoc = await getDoc(globalRatingRef);
      if (!globalRatingDoc.exists()) {
        return {
          averageRating: 0,
          totalRatings: 0,
          sumRatings: 0
        };
      }
  
      return globalRatingDoc.data();
    } catch (error) {
      console.error('Error getting global meal rating:', error);
      return { averageRating: 0, totalRatings: 0, sumRatings: 0 };
    }
  }
  