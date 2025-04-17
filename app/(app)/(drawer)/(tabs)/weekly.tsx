import Ionicons from "@expo/vector-icons/Ionicons";
import { Slot } from "expo-router";
import { StyleSheet, Image, Text, View } from "react-native";

export default function WeeklySurvey() {
  return (
    <View style={{ flex: 1 }}>
      <Text>WeeklySurvey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
