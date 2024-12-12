import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection,
    getDocs,
    arrayUnion,
    serverTimestamp,
    updateDoc
  } from 'firebase/firestore';
  import { auth } from "../firebase";  // Adjust path as needed
  
  const db = getFirestore();
  
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
      // Create rating entry
      const ratingEntry = {
        mealId,
        diningHall,
        mealOption,
        rating,
        timestamp: serverTimestamp()
      };
  
      // Update user's ratings
      await addUserRating(userId, ratingEntry);
  
      // Update global ratings
      await updateGlobalRating(mealId, ratingEntry);
  
      return { success: true };
    } catch (error) {
      console.error('Error submitting rating:', error);
      throw error;
    }
  }
  
  // Add rating to user's ratings collection
  async function addUserRating(userId, ratingEntry) {
    const userRatingsRef = doc(db, 'userRatings', userId);
    
    try {
      await setDoc(userRatingsRef, {
        ratings: arrayUnion(ratingEntry)
      }, { merge: true });
    } catch (error) {
      console.error('Error adding user rating:', error);
      throw error;
    }
  }
  
  // Update global ratings collection
  async function updateGlobalRating(mealId, ratingEntry) {
    const globalRatingRef = doc(db, 'globalRatings', mealId);
    
    try {
      const globalRatingDoc = await getDoc(globalRatingRef);
      
      if (!globalRatingDoc.exists()) {
        // Create new global rating document
        await setDoc(globalRatingRef, {
          diningHall: ratingEntry.diningHall,
          mealOption: ratingEntry.mealOption,
          totalRatings: 1,
          sumRatings: ratingEntry.rating,
          averageRating: ratingEntry.rating,
          lastUpdated: serverTimestamp()
        });
      } else {
        // Update existing global rating
        const currentData = globalRatingDoc.data();
        const newTotal = currentData.totalRatings + 1;
        const newSum = currentData.sumRatings + ratingEntry.rating;
        const newAverage = newSum / newTotal;
  
        await updateDoc(globalRatingRef, {
          totalRatings: newTotal,
          sumRatings: newSum,
          averageRating: newAverage,
          lastUpdated: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating global rating:', error);
      throw error;
    }
  }
  
  // Get user's ratings for a specific meal
  export async function getUserMealRating(mealId) {
    if (!auth.currentUser) return null;
  
    const userId = auth.currentUser.uid;
    const userRatingsRef = doc(db, 'userRatings', userId);
  
    try {
      const userRatingsDoc = await getDoc(userRatingsRef);
      if (!userRatingsDoc.exists()) return null;
  
      const userData = userRatingsDoc.data();
      const mealRatings = userData.ratings.filter(r => r.mealId === mealId);
      
      return mealRatings.length > 0 
        ? mealRatings.reduce((latest, current) => 
            latest.timestamp > current.timestamp ? latest : current
          )
        : null;
    } catch (error) {
      console.error('Error getting user meal rating:', error);
      throw error;
    }
  }
  
  // Get global rating for a specific meal
  export async function getGlobalMealRating(mealId) {
    const globalRatingRef = doc(db, 'globalRatings', mealId);
  
    try {
      const globalRatingDoc = await getDoc(globalRatingRef);
      return globalRatingDoc.exists() ? globalRatingDoc.data() : null;
    } catch (error) {
      console.error('Error getting global meal rating:', error);
      throw error;
    }
  }