import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
import Search from "./../General/Search";
const Tab = createBottomTabNavigator();
import { FontAwesome } from "@expo/vector-icons";
import QR from "./QR";
import Profile from "./Profile";
const Main = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set icon names based on route names (customize as needed)
          if (route.name === "AthelteSearch") {
            iconName = "search";
          } else if (route.name === "AthelteProfile") {
            iconName = "user";
          } else if (route.name === "QR") {
            iconName = "code";
          }

          // Return icon component
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue", // Color of the active tab icon
        tabBarInactiveTintColor: "gray", // Color of the inactive tab icon
        tabBarStyle: { backgroundColor: "white" }, // Background color of the tab bar
        // showLabel: false,
      })}
    >
      <Tab.Screen name="AthelteSearch" component={Search} />
      <Tab.Screen name="QR" component={QR} />
      <Tab.Screen name="AthelteProfile" component={Profile} />
    </Tab.Navigator>
  );
};
export default Main;
