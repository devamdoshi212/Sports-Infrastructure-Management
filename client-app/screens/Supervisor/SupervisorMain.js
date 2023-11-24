import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
const Tab = createBottomTabNavigator();
import Ionicons from "@expo/vector-icons/Ionicons";
import SupervisorNavigator from "./SupervisorNavigator";
import QR from "./QR";
import Home from "./Home";
const SupervisorMain = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "AddAthelte") {
            iconName = "person-add-outline";
          } else if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "SupervisorProfile") {
            iconName = "person-outline";
          } else if (route.name === "SupervisorQR") {
            iconName = "qr-code-outline";
          }

          // Return icon component
          return <Ionicons name={iconName} size={32} color="black" />;
        },
        tabBarActiveTintColor: "blue", // Color of the active tab icon
        tabBarInactiveTintColor: "black", // Color of the inactive tab icon
        tabBarStyle: { backgroundColor: "#d7a592" }, // Background color of the tab bar
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SupervisorQR" component={QR} />
      <Tab.Screen name="SupervisorProfile" component={SupervisorNavigator} />
    </Tab.Navigator>
  );
};
export default SupervisorMain;
