import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import GeneralComplexDetailsScreen from "./GeneralComplexDetailsScreen";
import Search from "./Search";
import AthelteFlatListScreen from "../Athelte/AthelteFlatScreen";
import FlatListScreen from "./FlatListScreen";
import ComplexDetails from "./ComplexDetails";
import MyCarousel from "./GeneralSearch";
import Events from "./Events";
const SearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Search"
          component={MyCarousel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplexFullDetails"
          component={GeneralComplexDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplexDetailsinGeneral"
          component={GeneralComplexDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportComplexName"
          component={ComplexDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Events"
          component={Events}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SearchNavigator;
