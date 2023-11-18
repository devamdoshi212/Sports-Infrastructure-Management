import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import "react-native-gesture-handler";
import Search from "./Search";
const Tab = createBottomTabNavigator();
import Profile from "./Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchNavigator from "./SearchNavigator";

const NoAuthTab = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set icon names based on route names (customize as needed)
          if (route.name === "SearchNavigator") {
            iconName = "search-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          // Return icon component
          return <Ionicons name={iconName} size={32} color="black" />;
        },
        tabBarActiveTintColor: "blue", // Color of the active tab icon
        tabBarInactiveTintColor: "black", // Color of the inactive tab icon
        tabBarStyle: {
          backgroundColor: "#d7a592",
        }, // Background color of the tab bar
        // showLabel: false,
      })}
    >
      <Tab.Screen name="SearchNavigator" component={SearchNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default NoAuthTab;

{
  /* <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator> */
}
