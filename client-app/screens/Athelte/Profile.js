import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import ipconfig from "../../ipconfig";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

import { NotificationActions } from "../../store/NotificationToken";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
async function removeItem() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    // Handle the error
  }
}
function Profile({ navigation }) {
  const dispatch = useDispatch();
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const [image, setimage] = useState("./../../assets/icon.png");

  if (!Atheltedata || !Userdata) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  const ProfileDetailHandler = () => {
    navigation.navigate("DetailProfile");
  };

  useEffect(() => {
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (
        remoteMessage.notification.title === "You are Added in Sports Complex"
      ) {
        navigation.navigate("SportEnroll");
      } else if (remoteMessage.notification.title === "Your Complaint Solved") {
        navigation.navigate("ComplaintList");
      }
      // Alert.alert(
      //   remoteMessage.notification.title,
      //   remoteMessage.notification.body
      // );
    });
    let i;
    if (Atheltedata) i = Atheltedata[0].baseUrl.slice(1);
    setimage(i);
  }, [image, Atheltedata]);
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
        <TouchableOpacity onPress={ProfileDetailHandler}>
          <View style={styles.profileCard}>
            <View style={styles.profileImage}>
              <Image
                style={{
                  width: 125,
                  height: 125,
                  borderRadius: 62.5,
                  borderColor: "#fbe8e0",
                  borderWidth: 5,
                }}
                source={{ uri: `http://${ip}:9999/${image}` }}
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
        </TouchableOpacity>
        {Atheltedata[0].createdBy && (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Goals");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Goals</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LeaderBoard");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Leaderboard</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SportwiseLeaderBoard");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Sportswise LeaderBoard</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Performance");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Performance/Badge</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SportsComplexDetails");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Sport Complex Details</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("IDCard");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>ID card</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SportEnroll");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Enrolled Sports</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PaymentHistory");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Payment History</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ComplaintList");
              }}
            >
              <View style={styles.row}>
                <Text style={styles.actionText}>Complaint</Text>
                <MaterialIcons name="navigate-next" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        )}
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 30,
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
    marginTop: "20%",
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
    marginBottom: 10,
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

export default Profile;
