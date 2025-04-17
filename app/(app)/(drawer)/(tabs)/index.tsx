/**
 * index.tsx
 *
 * Main dashboard of the mood tracking app.
 * Displays greeting, navigation buttons for daily and weekly check-ins,
 * and a summary graph of recent mood trends.
 *
 * Uses:
 * - React Navigation for screen navigation
 * - Custom MoodGraph component
 * - Firebase Firestore for pulling recent mood data
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSession } from "@/context";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

/**
 * TabsIndexScreen displays the main home screen content with personalized welcome message
 * @returns {JSX.Element} Home screen component
 */
const TabsIndexScreen = () => {
  // ============================================================================
  // Hooks
  // ============================================================================
  const { signOut, user } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================
  
  /**
   * Handles the logout process
   */
  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  // ============================================================================
  // Computed Values
  // ============================================================================
  
  /**
   * Gets the display name for the welcome message
   * Prioritizes user's name, falls back to email, then default greeting
   */
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';

  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Welcome back,
        </Text>
        <Text className="text-2xl font-bold text-blue-600">
          {displayName}
        </Text>
        <Text className="text-sm text-gray-500 mt-2">
          {user?.email}
        </Text>
      </View>
      
      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}
        className="bg-red-500 px-6 py-3 rounded-lg active:bg-red-600"
      >
        <Text className="text-white font-semibold text-base">Logout</Text>
      </Pressable>

      {/* Check In button (daily) */}
      <Pressable
        onPress={() => router.push("/(app)/(drawer)/(tabs)/check-in")}
        className="bg-blue-500 px-6 py-3 rounded-lg mt-4 active:bg-blue-600"
      >
        <Text className="text-white font-semibold text-base">Daily Check-In</Text>  
      </Pressable>

      {/* Weekly Survey button */}
      <Pressable
        onPress={() => router.push("/weekly")}
        style={{
          backgroundColor: Colors.light.success,
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Weekly Survey
        </Text>
      </Pressable>

      {/* Placeholder for future features */}
      {/* TODO: Add mood trend mini-graph */}

    </View>
  );
};

export default TabsIndexScreen;
