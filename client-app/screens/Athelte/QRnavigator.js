import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import QR from "./QR";
import AthleteResponse from "./AthelteResponse";
const Stack = createStackNavigator();
const QRNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="QR"
          component={QR}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExitForm"
          component={AthleteResponse}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default QRNavigator;
