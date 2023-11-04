import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
const Tab = createBottomTabNavigator();
import Ionicons from "@expo/vector-icons/Ionicons";
import QR from "./QR";
import ProfileNavigator from "./ProfileNavigator";
import AthelteSearchNavigator from "./AthelteSearchNavigator";
import QRNavigator from "./QRnavigator";
const Main = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set icon names based on route names (customize as needed)
          if (route.name === "AthelteSearch") {
            iconName = "search-outline";
          } else if (route.name === "AthelteProfile") {
            iconName = "person-outline";
          } else if (route.name === "Attendance") {
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
      <Tab.Screen name="AthelteSearch" component={AthelteSearchNavigator} />
      <Tab.Screen name="Attendance" component={QRNavigator} />
      <Tab.Screen name="AthelteProfile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
export default Main;
