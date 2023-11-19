import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const GoalScreen = () => {
  const goals = [
    {
      id: 1,
      title: "Learn React Native",
      description: "Build a React Native app with goals",
      startDate: "2023-01-01",
      targetDate: "2023-11-31",
    },
  ];

  const calculateRemainingDays = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = Math.abs(target - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingDays(goals[0].targetDate);
  const completedDays = 365 - remainingDays;

  const circlePercentage = (completedDays / 365) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          styles.bigCircle,
          {
            width: 120,
            height: 120,
            borderWidth: circlePercentage * 0.01 * 10,
          },
        ]}
      >
        <Text style={styles.bigCircleText}>
          Remaining Days: {remainingDays}
        </Text>
      </View>

      {goals.map((goal) => (
        <View key={goal.id} style={styles.goalContainer}>
          <Text style={styles.title}>{goal.title}</Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.description}>{goal.description}</Text>
          <View style={styles.middleContainer}>
            <View>
              <Text style={styles.date}>
                Start Date: {new Date(goal.startDate).toLocaleDateString()}
              </Text>
              <Text style={styles.date}>
                Target Date: {new Date(goal.targetDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.achievedButton}
            onPress={() => console.log("Goal Achieved")}
          >
            <Text style={styles.buttonText}>Achieved</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 50,
  },
  remainingDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  remainingDaysText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  remainingDaysCount: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  goalContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    width: 300,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  date: {
    fontStyle: "italic",
    marginBottom: 8,
  },
  achievedButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bigCircle: {
    width: 100,
    height: 100,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#ccc",
  },
  bigCircleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GoalScreen;
