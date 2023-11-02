import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
const Tab = createBottomTabNavigator();
import AddAthelte from "./AddAthelte";
import ComplexDetails from "./ComplexDetails";
import SupervisorProfile from "./SupervisorProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import SupervisorNavigator from "./SupervisorNavigator";
import QR from "./QR";
const SupervisorMain = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set icon names based on route names (customize as needed)
          if (route.name === "AddAthelte") {
            iconName = "person-add-outline";
          } else if (route.name === "ComplexDetails") {
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
        tabBarInactiveTintColor: "gray", // Color of the inactive tab icon
        tabBarStyle: { backgroundColor: "white" }, // Background color of the tab bar
        // showLabel: false,
      })}
    >
      <Tab.Screen name="AddAthelte" component={AddAthelte} />
      <Tab.Screen name="ComplexDetails" component={ComplexDetails} />
      <Tab.Screen name="SupervisorQR" component={QR} />
      <Tab.Screen name="SupervisorProfile" component={SupervisorNavigator} />
    </Tab.Navigator>
  );
};
export default SupervisorMain;
