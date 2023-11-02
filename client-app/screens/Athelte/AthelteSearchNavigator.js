import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import GeneralComplexDetailsScreen from "../General/GeneralComplexDetailsScreen";
import AthelteSearch from "./AthelteSearch";
import AthelteFlatListScreen from "./AthelteFlatScreen";
const AthelteSearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Search"
          component={AthelteSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplexFullDetails"
          component={GeneralComplexDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportComplex"
          component={AthelteFlatListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AthelteSearchNavigator;
