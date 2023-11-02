import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import GeneralComplexDetailsScreen from "./GeneralComplexDetailsScreen";
import Search from "./Search";
import AthelteFlatListScreen from "../Athelte/AthelteFlatScreen";
const SearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplexFullDetails"
          component={GeneralComplexDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportComplexName"
          component={AthelteFlatListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchNavigator;
