import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import { useSession } from "@/context";

/**
 * SignUp component handles new user registration
 * @returns {JSX.Element} Sign-up form component
 */
export default function SignUp() {
  // ============================================================================
  // Hooks & State
  // ============================================================================
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp } = useSession();

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles the registration process
   * @returns {Promise<Models.User<Models.Preferences> | null>}
   */
  const handleRegister = async () => {
    try {
      return await signUp(email, password, name);
    } catch (err) {
      console.log("[handleRegister] ==>", err);
      return null;
    }
  };

  /**
   * Handles the sign-up button press
   */
  const handleSignUpPress = async () => {
    const resp = await handleRegister();
    if (resp) {
      router.replace("/(app)/(drawer)/(tabs)/");
    }
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View className="flex-1 justify-center items-center p-4" style={{ backgroundColor: "#FAF8F5" /* Cream White */ }}>
      {/* Welcome Section */}
      <View className="items-center mb-8">
        <Text className="text-2xl font-bold" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
          Create Account
        </Text>
        <Text className="text-sm" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
          Sign up to get started
        </Text>
      </View>

      {/* Form Section */}
      <View className="w-full max-w-[300px] space-y-4 mb-8">
        <View>
          <Text className="text-sm font-medium" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
            Name
          </Text>
          <TextInput
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
            textContentType="name"
            autoCapitalize="words"
            style={{
              backgroundColor: "#FAF8F5" /* Cream White */,
              borderColor: "#A58DCE" /* Soothing Purple */,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              color: "#3B3B3B" /* Soft Charcoal */,
            }}
          />
        </View>

        <View>
          <Text className="text-sm font-medium" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
            Email
          </Text>
          <TextInput
            placeholder="name@mail.com"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: "#FAF8F5" /* Cream White */,
              borderColor: "#A58DCE" /* Soothing Purple */,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              color: "#3B3B3B" /* Soft Charcoal */,
            }}
          />
        </View>

        <View>
          <Text className="text-sm font-medium" style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>
            Password
          </Text>
          <TextInput
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="newPassword"
            style={{
              backgroundColor: "#FAF8F5" /* Cream White */,
              borderColor: "#A58DCE" /* Soothing Purple */,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              color: "#3B3B3B" /* Soft Charcoal */,
            }}
          />
        </View>
      </View>

      {/* Sign Up Button */}
      <Pressable
        onPress={handleSignUpPress}
        style={{
          backgroundColor: "#A58DCE" /* Soothing Purple */,
          paddingVertical: 12,
          borderRadius: 8,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Text style={{ color: "#FAF8F5" /* Cream White */, fontWeight: "bold", textAlign: "center" }}>
          Sign Up
        </Text>
      </Pressable>

      {/* Sign In Link */}
      <View className="flex-row items-center mt-6">
        <Text style={{ color: "#3B3B3B" /* Soft Charcoal */ }}>Already have an account?</Text>
        <Link href="/sign-in" asChild>
          <Pressable>
            <Text style={{ color: "#A58DCE" /* Soothing Purple */, fontWeight: "bold", marginLeft: 8 }}>
              Sign In
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
