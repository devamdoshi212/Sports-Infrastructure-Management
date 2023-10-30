import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import Login from "./Login";
import { View } from "react-native";
const Tab = createBottomTabNavigator();
import { FontAwesome } from "@expo/vector-icons";
const General = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set icon names based on route names (customize as needed)
          if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Profile") {
            iconName = "user";
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
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Login} />
    </Tab.Navigator>
  );
};
export default General;
