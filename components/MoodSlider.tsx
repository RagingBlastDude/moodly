/**
 * MoodSlider.tsx
 *
 * Reusable slider component to rate mood/emotion intensity.
 *
 * Props:
 * - label: string – name of the emotion (e.g., "Excited")
 * - emoji: string – optional emoji representation
 * - value: number – current slider value
 * - onChange: (val: number) => void – handler to update slider state
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

interface MoodSliderProps {
  label: string; // Name of the emotion (e.g., "Excited")
  emoji?: string; // Optional emoji representation
  value: number; // Current slider value
  onChange: (value: number) => void; // Callback when slider value changes
}

export const MoodSlider: React.FC<MoodSliderProps> = ({
  label,
  emoji,
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {emoji && <Text style={styles.emoji}>{emoji}</Text>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#0a7ea4"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#0a7ea4"
      />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  value: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});

