/**
 * firestore-service.ts
 * 
 * Contains helper functions for reading and writing to Firestore.
 * Handles user-specific paths and abstracts Firestore logic away from components.
 * 
 * Functions:
 * - saveDailyCheckIn(userId, date, emotions)
 * - saveWeeklySurvey(userId, weekId, phq9Answers, gad7Answers)
 * - getMoodHistory(userId, range)
 * - getWeeklySurveyHistory(userId)
 */

import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getTodayDate, getWeekId } from "./dateUtils";
import { db } from "./firebase-config";

/**
 * Saves a daily mood check-in to Firestore.
 * @param {string} userId - The user's ID.
 * @param {Record<string, number>} emotions - The mood data (e.g., { excited: 4, irritable: 2 }).
 * @returns {Promise<void>}
 */
export async function saveDailyCheckIn(userId: string, emotions: Record<string, number>): Promise<void> {
  const date = getTodayDate();
  const docRef = doc(db, `users/${userId}/dailyCheckIns/${date}`);
  await setDoc(docRef, { emotions, timestamp: new Date().toISOString() });
}

/**
 * Saves a weekly survey (PHQ-9 and GAD-7) to Firestore.
 * @param {string} userId - The user's ID.
 * @param {number[]} phq9Answers - Answers to the PHQ-9 survey.
 * @param {number[]} gad7Answers - Answers to the GAD-7 survey.
 * @returns {Promise<void>}
 */
export async function saveWeeklySurvey(userId: string, phq9Answers: number[], gad7Answers: number[]): Promise<void> {
  const weekId = getWeekId();
  const docRef = doc(db, `users/${userId}/weeklySurveys/${weekId}`);
  await setDoc(docRef, { phq9: phq9Answers, gad7: gad7Answers, timestamp: new Date().toISOString() });
}

/**
 * Retrieves mood history for a given date range.
 * @param {string} userId - The user's ID.
 * @param {Date} startDate - The start date of the range.
 * @param {Date} endDate - The end date of the range.
 * @returns {Promise<Record<string, any>[]>} An array of mood check-in documents.
 */
export async function getMoodHistory(userId: string, startDate: Date, endDate: Date): Promise<Record<string, any>[]> {
  const start = startDate.toISOString();
  const end = endDate.toISOString();
  const colRef = collection(db, `users/${userId}/dailyCheckIns`);
  const q = query(colRef, where("timestamp", ">=", start), where("timestamp", "<=", end));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * Retrieves weekly survey history for a user.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Record<string, any>[]>} An array of weekly survey documents.
 */
export async function getWeeklySurveyHistory(userId: string): Promise<Record<string, any>[]> {
  const colRef = collection(db, `users/${userId}/weeklySurveys`);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

