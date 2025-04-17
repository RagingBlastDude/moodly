/**
 * check-in.tsx
 * 
 * Displays a list of 5–10 emotion items from the PANAS scale.
 * Each emotion is paired with a slider or emoji-based input to record intensity (1–5).
 * Data is submitted to Firestore under users/{userId}/dailyCheckIns/{YYYY-MM-DD}.
 * 
 * Features:
 * - Dynamic list of emotion items
 * - Local state tracking slider values
 * - Submit handler with Firestore write
 */
/**
 * check-in.tsx
 *
 * Renders a list of selected emotions from PANAS using sliders.
 * Allows users to quickly check in on their mood with ratings from 1 to 5.
 * Submits mood data to Firestore under users/{uid}/dailyCheckIns/{YYYY-MM-DD}.
 *
 * Props:
 * - None (retrieves UID from auth context or provider)
 *
 * Hooks:
 * - useState for slider values
 * - useEffect for initialization and validation
 */

import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { MoodSlider } from "@/components/MoodSlider";
import { saveDailyCheckIn } from "@/lib/firestore-service";
import { useSession } from "@/context";

const emotions = [
  { label: "Excited", emoji: "😄" },
  { label: "Irritable", emoji: "😠" },
  { label: "Calm", emoji: "😌" },
  { label: "Sad", emoji: "😢" },
  { label: "Energetic", emoji: "⚡" },
];

const CheckIn = () => {
  const { user } = useSession();
  const [moodValues, setMoodValues] = useState<Record<string, number>>(
    Object.fromEntries(emotions.map((e) => [e.label, 3]))
  );

  const handleSliderChange = (label: string, value: number) => {
    setMoodValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async () => {
    if (user) {
      await saveDailyCheckIn(user.uid, moodValues);
      alert("Mood check-in saved!");
    } else {
      alert("User not authenticated.");
    }
    alert("Submit functionality disabled for testing.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Mood Check-In</Text>
      {emotions.map((emotion) => (
        <MoodSlider
          key={emotion.label}
          label={emotion.label}
          emoji={emotion.emoji}
          value={moodValues[emotion.label]}
          onChange={(value) => handleSliderChange(emotion.label, value)}
        />
      ))}
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#0a7ea4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});