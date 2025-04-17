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
import { View, Text, Pressable, Image } from "react-native";
import { useSession } from "@/context";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Logo from "@/assets/images/Moodly-Icon.png"; // Adjusted to use the alias "@/assets"

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
    <View className="flex-1 justify-center items-center p-4" style={{ backgroundColor: "#FAF8F5" /* Cream White */ }}>
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Image
          source={Logo}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <Text className="text-xl font-bold" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
          Welcome to Moodly,
        </Text>
        <Text className="text-2xl font-bold" style={{ color: "#A58DCE" /* Soothing Purple */ }}>
          {displayName}
        </Text>
        <Text className="text-sm mt-2" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
          {user?.email}
        </Text>
      </View>
      
      {/* Logout Button */}
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#F9CB61" /* Warm Yellow */,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#3B3B3B" /* Soft Charcoal */, fontWeight: "bold", fontSize: 16 }}>
          Logout
        </Text>
      </Pressable>

      {/* Check In button (daily) */}
      <Pressable
        onPress={() => router.push("/(app)/(drawer)/(tabs)/check-in")}
        style={{
          backgroundColor: "#A58DCE" /* Soothing Purple */,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "#FAF8F5" /* Cream White */, fontWeight: "bold", fontSize: 16 }}>
          Daily Check-In
        </Text>  
      </Pressable>

      {/* Weekly Survey button */}
      <Pressable
        onPress={() => router.push("/weekly")}
        style={{
          backgroundColor: "#F9CB61" /* Warm Yellow */,
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text style={{ color: "#3B3B3B" /* Soft Charcoal */, fontWeight: "bold", fontSize: 16 }}>
          Weekly Survey
        </Text>
      </Pressable>

      {/* Placeholder for future features */}
      {/* TODO: Add mood trend mini-graph */}
    </View>
  );
};

export default TabsIndexScreen;
