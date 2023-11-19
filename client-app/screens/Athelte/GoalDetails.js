import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const calculateRemainingDays = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = Math.abs(target - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const calculateDays = (startdate, actualdate) => {
  const actual = new Date(actualdate);
  const start = new Date(startdate);
  const diffTime = Math.abs(actual - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
const GoalScreen = ({ route, navigation }) => {
  const item = route.params.data;
  console.log(item);
  const ip = ipconfig.ip;
  const { _id } = useSelector((state) => state.athelte.Athelte[0]);

  const remainingDays = calculateRemainingDays(item.targetdate);
  const completedDays = 365 - remainingDays;

  const circlePercentage = (completedDays / 365) * 100;
  const achievedHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      updatedAchievedStatus: "1",
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/updatedAchievedStatus?id=${_id}&goalId=${item._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        navigation.navigate("Goals");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.achieved === "0" ? (
        <>
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

          <View style={styles.goalContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.middleContainer}>
              <View>
                <Text style={styles.date}>
                  Start Date: {new Date(item.startdate).toLocaleDateString()}
                </Text>
                <Text style={styles.date}>
                  Target Date: {new Date(item.targetdate).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.achievedButton}
              onPress={achievedHandler}
            >
              <Text style={styles.buttonText}>Achieved</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
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
              Completed in {calculateDays(item.startdate, item.actualdate)} Days
            </Text>
          </View>

          <View style={styles.goalContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.middleContainer}>
              <View>
                <Text style={styles.date}>
                  Start Date: {new Date(item.startdate).toLocaleDateString()}
                </Text>
                <Text style={styles.date}>
                  Target Date: {new Date(item.targetdate).toLocaleDateString()}
                </Text>

                <Text style={styles.date}>
                  Goal Achieved Date:{" "}
                  {new Date(item.actualdate).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.achievedButton}
              // onPress={achievedHandler}
            >
              <Text style={styles.buttonText}>Goal Achieved</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
