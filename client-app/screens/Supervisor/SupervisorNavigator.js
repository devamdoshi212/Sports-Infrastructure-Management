import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// import ProfileDetails from "./ProfileDetails";
import SupervisorProfile from "./SupervisorProfile";
const SupervisorNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="MainProfile"
          component={SupervisorProfile}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="DetailProfile"
          component={ProfileDetails}
          options={{ headerShown: false }}
        /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SupervisorNavigator;
