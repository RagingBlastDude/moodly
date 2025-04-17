import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useSession } from "@/context";
import * as Notifications from "expo-notifications";

// Set notification handler globally
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();

  const handleLogin = async () => {
    try {
      return await signIn(email, password);
    } catch (err) {
      console.log("[handleLogin] ==>", err);
      return null;
    }
  };

  const handleSignInPress = async () => {
    const resp = await handleLogin();
    if (resp) {
      await registerAndScheduleNotifications(); // ✅ setup notifications
      router.replace("/(app)/(drawer)/(tabs)/");
    }
  };

  const registerAndScheduleNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Please enable notifications for mood check-ins!");
      return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync(); // prevent duplicates

    // Daily notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🧠 Mood Check-In",
        body: "How are you feeling today? Tap to record your mood.",
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });

    // Weekly notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📋 Weekly Survey",
        body: "Complete your weekly check-in to track progress.",
      },
      trigger: {
        weekday: 7, // Sunday
        hour: 18,
        minute: 0,
        repeats: true,
      },
    });

    console.log("✅ Notifications scheduled");
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</Text>
        <Text className="text-sm text-gray-500">Please sign in to continue</Text>
      </View>

      {/* Form Section */}
      <View className="w-full max-w-[300px] space-y-4 mb-8">
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">Email</Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>

        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">Password</Text>
          <TextInput
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
          />
        </View>
      </View>

      {/* Sign In Button */}
      <Pressable
        onPress={handleSignInPress}
        className="bg-blue-600 w-full max-w-[300px] py-3 rounded-lg active:bg-blue-700"
      >
        <Text className="text-white font-semibold text-base text-center">Sign In</Text>
      </Pressable>

      {/* Sign Up Link */}
      <View className="flex-row items-center mt-6">
        <Text className="text-gray-600">Don't have an account?</Text>
        <Link href="/sign-up" asChild>
          <Pressable className="ml-2">
            <Text className="text-blue-600 font-semibold">Sign Up</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
