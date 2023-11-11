import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import AthleteDetails from "./AthelteDetails";
import AthelteProfile from "./AthelteProfile";
const Stack = createStackNavigator();
const ProfileNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="MainProfile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailProfile"
          component={ProfileDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthelteDetails"
          component={AthleteDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthleteProfile"
          component={AthelteProfile}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
