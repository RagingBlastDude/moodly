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
import * as Notifications from "expo-notifications";

const emotions = [
  { label: "Excited", emoji: "😄" },
  { label: "Irritable", emoji: "😠" },
  { label: "Calm", emoji: "😌" },
  { label: "Sad", emoji: "😢" },
  { label: "Energetic", emoji: "⚡" },
];

const scheduleDailyNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // optional: prevent duplicates

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🧠 Mood Check-In",
      body: "How are you feeling today? Tap to record your mood.",
    },
    trigger: {
      hour: 20, // 8:00 PM local time
      minute: 0,
      repeats: true,
    },
  });
};

const CheckIn = () => {
  const { user } = useSession();
  const [moodValues, setMoodValues] = useState<Record<string, number>>(
    Object.fromEntries(emotions.map((e) => [e.label, 3]))
  );

  const handleSliderChange = (label: string, value: number) => {
    setMoodValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("User not authenticated.");
      return;
    }
  
    console.log("Submitting daily check-in:", moodValues);
  
    try {
      await saveDailyCheckIn(user.uid, moodValues);
      alert("Mood check-in saved!");
    } catch (err) {
      console.error("❌ Error saving check-in:", err);
      alert("Error saving your mood check-in.");
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: "#FAF8F5" /* Cream White */ }]}>
      <Text style={[styles.title, { color: "#3B3B3B" /* Soft Charcoal */ }]}>Daily Mood Check-In</Text>
      {emotions.map((emotion) => (
        <MoodSlider
          key={emotion.label}
          label={emotion.label}
          emoji={emotion.emoji}
          value={moodValues[emotion.label]}
          onChange={(value) => handleSliderChange(emotion.label, value)}
        />
      ))}
      <Pressable
        style={[
          styles.submitButton,
          { backgroundColor: "#A58DCE" /* Soothing Purple */ },
        ]}
        onPress={handleSubmit}
      >
        <Text style={[styles.submitText, { color: "#FAF8F5" /* Cream White */ }]}>
          Submit
        </Text>
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
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});