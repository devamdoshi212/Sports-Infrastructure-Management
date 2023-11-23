import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import messaging from "@react-native-firebase/messaging";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ipconfig from "../../ipconfig";
import { NotificationActions } from "../../store/NotificationToken";
async function removeItem() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    // Handle the error
  }
}
function SupervisorProfile({ navigation }) {
  const dispatch = useDispatch();
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const [image, setimage] = useState("./../../assets/Supervisor.png");
  console.log(Userdata);
  useEffect(() => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage.notification.title === "Athlete Raised Complaint") {
        navigation.navigate("ListComplaint");
      }

      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body
      // );
    });
  }, [image]);
  const handleLogout = () => {
    dispatch(UserActions.getuserRole({ Role: "" }));
    dispatch(NotificationActions.gettoken());

    removeItem();
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "#fbe8e0",
      }}
    >
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            navigation.navigate("DetailProfile");
          }}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileImage}>
              <Image
                style={{
                  width: 125,
                  height: 125,
                  borderRadius: 62.5,
                  borderColor: "#fbe8e0",
                  borderWidth: 5,
                  backgroundColor: "white",
                }}
                source={require("../../assets/Supervisor.png")}
              />
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  alignSelf: "center",
                  marginTop: "1%",
                }}
              >
                {Userdata.Name}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddAthlete");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Add Athlete</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AthleteDetails");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Athlete Details</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Attendance");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Attendance</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SportwiseLeaderBoard");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Leaderboard</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EventPage");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Updates</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AthelteListComplaint");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Atheltes Complaint</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ListComplaint");
            }}
          >
            <View style={styles.row}>
              <Text style={styles.actionText}>Complaint</Text>
              <MaterialIcons name="navigate-next" size={24} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Logout from the application",
              "Are you sure you want to logout?",
              [
                {
                  text: "CANCEL",
                  onPress: () => console.log("Cancel"),
                  style: "cancel",
                },
                { text: "LOGOUT", onPress: handleLogout },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
          <MaterialIcons name="logout" size={24} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 5,
    marginTop: "25%",
    paddingBottom: "5%",
    backgroundColor: "#9cafa2",
    flexDirection: "column",
  },
  profileImage: {
    flex: 1,
    alignSelf: "center",
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
    marginTop: "-15%",
  },
  card: {
    flexDirection: "column",
    marginTop: "1%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 5,
    marginBottom: "2%",
    paddingBottom: "5%",
    backgroundColor: "#f2b69c",
  },
  row: {
    width: "120%",
    marginTop: "5%",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: "3%",
  },
  actionText: {
    width: "75%",
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: "3%",
    width: "94%",
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    color: "black",
    width: "75%",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default SupervisorProfile;
