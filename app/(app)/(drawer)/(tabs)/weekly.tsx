import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { saveWeeklySurvey } from "@/lib/firestore-service";
import { useSession } from "@/context";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself—or that you are a failure",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly that others noticed",
  "Thoughts that you would be better off dead or hurting yourself",
];

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const WeeklySurvey = () => {
  const { user } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState<number[]>(Array(9).fill(0));
  const [gad7Answers, setGad7Answers] = useState<number[]>(Array(7).fill(0));

  const handleAnswerChange = (index: number, value: number, isPhq9: boolean) => {
    if (isPhq9) {
      setPhq9Answers((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    } else {
      setGad7Answers((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (user) {
      await saveWeeklySurvey(user.uid, phq9Answers, gad7Answers);
      alert("Weekly survey submitted!");
    } else {
      alert("User not authenticated.");
    }
    alert("Submit functionality disabled for testing.");
  };

  const renderQuestion = (question: string, index: number, isPhq9: boolean) => (
    <View key={index} style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        {[0, 1, 2, 3].map((value) => (
          <Pressable
            key={value}
            style={[
              styles.optionButton,
              (isPhq9 ? phq9Answers[index] : gad7Answers[index]) === value &&
                styles.selectedOption,
            ]}
            onPress={() => handleAnswerChange(index, value, isPhq9)}
          >
            <Text style={styles.optionText}>{value}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Survey</Text>
      {currentStep === 0 &&
        phq9Questions.map((question, index) =>
          renderQuestion(question, index, true)
        )}
      {currentStep === 1 &&
        gad7Questions.map((question, index) =>
          renderQuestion(question, index, false)
        )}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <Pressable style={styles.navButton} onPress={handleBack}>
            <Text style={styles.navButtonText}>Back</Text>
          </Pressable>
        )}
        {currentStep < 1 ? (
          <Pressable style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>Next</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default WeeklySurvey;

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
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
  selectedOption: {
    backgroundColor: "#0a7ea4",
    borderColor: "#0a7ea4",
  },
  optionText: {
    color: "#333",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  navButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#0a7ea4",
    padding: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
