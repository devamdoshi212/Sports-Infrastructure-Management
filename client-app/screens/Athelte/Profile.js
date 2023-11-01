import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ipconfig from "../../ipconfig";
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

  const ProfileDetailHandler = () => {
    console.log("hello");
    navigation.navigate("DetailProfile");
  };

  useEffect(() => {
    // console.log(Atheltedata[0].baseUrl);
    const i = Atheltedata[0].baseUrl.slice(1);
    console.log(i);
    setimage(i);
  }, [image]);
  // console.log(Userdata.base)
  const handleLogout = () => {
    dispatch(UserActions.getuserRole({ Role: "" }));
    removeItem();
    // Implement your logout logic here
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={ProfileDetailHandler}>
        <View style={styles.profileInfo}>
          <View style={styles.leftColumn}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: 1,
              }}
              source={{ uri: `http://${ip}:9999/${image}` }}
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
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.row}>
            {/* <FontAwesome5 name="user" size={24} /> */}
            <Text style={styles.actionText}>Sport ComplexName</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          // onPress={() => navigateToScreen('QuizHistroyScreen')}
        >
          <View style={styles.row}>
            {/* <MaterialCommunityIcons name="history" size={24} /> */}
            <Text style={styles.actionText}>Sports_enrolled</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          // onPress={() => navigateToScreen('MySubjectsScreen')}
        >
          <View style={styles.row}>
            {/* <Ionicons name="repeat-outline" size={24} /> */}
            <Text style={styles.actionText}>ID_card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            navigation.navigate("PaymentHistory");
          }}
        >
          <View style={styles.row}>
            {/* <MaterialCommunityIcons name="certificate-outline" size={24} /> */}
            <Text style={styles.actionText}>Payment History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            navigation.navigate("AthelteComplaint");
          }}
        >
          <View style={styles.row}>
            {/* <Ionicons name="bookmarks-outline" size={24} /> */}
            <Text style={styles.actionText}>Complaint</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={{ width: "50%", alignSelf: "center", marginTop: "5%" }}>
            <Button color="#FF3D3D" title="Logout" onPress={handleLogout} />
            {/* <MaterialCommunityIcons name="logout" size={24} /> */}
            {/* <Button title="Logout" style={styles.actionText}/> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 25,
  },
  profileInfo: {
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
    marginTop: "8%",
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
  profileImage: {
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
  actionText: {
    width: "80%",

    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Profile;
