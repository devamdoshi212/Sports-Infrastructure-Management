import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { UserActions } from "../../store/User";
async function removeItem() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    // Handle the error
  }
}

const SupervisorProfile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(UserActions.getuserRole({ Role: "" }));
    removeItem();
    // Implement your logout logic here
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        marginTop: 50,
      }}
    >
      <View style={styles.button}>
        <Ionicons name="log-out" size={24} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
    fontSize: 18,
  },
});

export default SupervisorProfile;
