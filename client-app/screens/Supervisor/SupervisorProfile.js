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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ipconfig from "../../ipconfig";
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
  const [image, setimage] = useState("./../../assets/icon.png");

  useEffect(() => {}, [image]);
  const handleLogout = () => {
    dispatch(UserActions.getuserRole({ Role: "" }));
    removeItem();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <View style={styles.back}>
          <Ionicons name="arrow-back" size={24} />
        </View> */}
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>My Profile</Text>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate("DetailProfile");
          }}
        >
          <View style={styles.SupervisorInfo}>
            <View style={styles.leftColumn}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginLeft: 1,
                }}
                source={require("./../../assets/icon.png")}
              />
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.name}>Name : {Userdata.Name}</Text>
              <Text style={styles.name}>Email : {Userdata.Email}</Text>
              <Text style={styles.name}>ContactNo : {Userdata.ContactNum}</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.actions}>
          {/* <TouchableOpacity style={styles.actionButton}>
          <View style={styles.row}>
            <Text style={styles.actionText}>Sport Complex Details</Text>
          </View>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("AthleteDetails");
            }}
          >
            <View style={styles.row}>
              {/* <MaterialCommunityIcons name="history" size={24} /> */}
              <Text style={styles.actionText}>Athlete Details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("Attendance");
            }}
          >
            <View style={styles.row}>
              {/* <Ionicons name="repeat-outline" size={24} /> */}
              <Text style={styles.actionText}>Attendance</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("AthelteListComplaint");
            }}
          >
            <View style={styles.row}>
              {/* <MaterialCommunityIcons name="certificate-outline" size={24} /> */}
              <Text style={styles.actionText}>Athelte Coming Complaint</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("ListComplaint");
            }}
          >
            <View style={styles.row}>
              {/* <MaterialCommunityIcons name="certificate-outline" size={24} /> */}
              <Text style={styles.actionText}>View Complaint</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("RaiseComplaint");
            }}
          >
            <View style={styles.row}>
              {/* <MaterialCommunityIcons name="certificate-outline" size={24} /> */}
              <Text style={styles.actionText}>Raise Complaint</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate("Response");
            }}
          >
            <View style={styles.row}>
              {/* <MaterialCommunityIcons name="certificate-outline" size={24} /> */}
              <Text style={styles.actionText}>Daily Response</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View
              style={{ width: "40%", alignSelf: "center", marginTop: "3%" }}
            >
              <Button color="#FF3D3D" title="Logout" onPress={handleLogout} />
              {/* <MaterialCommunityIcons name="logout" size={24} /> */}
              {/* <Button title="Logout" style={styles.actionText}/> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 25,
  },
  header: {
    margin: 20,
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
  SupervisorInfo: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "95%",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 2,
    paddingLeft: 20,
    paddingBottom: 8,
    marginLeft: 6,
  },
  SupervisorImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  name: {
    fontSize: 16,
    color: "grey",
    marginTop: 5,
  },
  row: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    flexDirection: "row",
  },
  actions: {
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
  actionButton: {
    paddingVertical: 10,
  },
  scrollContainer: {
    // flexGrow: 1,
    width: "90%",
    padding: 10,
    borderWidth: 1,
  },
  actionText: {
    width: "80%",

    fontWeight: "bold",
    fontSize: 15,
  },
});

export default SupervisorProfile;
