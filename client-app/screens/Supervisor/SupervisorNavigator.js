import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// import ProfileDetails from "./ProfileDetails";
import SupervisorProfile from "./SupervisorProfile";
import SupervisorProfileDetail from "./SupervisorProfileDetail";
import AthleteDetails from "./AthleteDetails";
import AtheleteProfile from "./AtheleteProfile";
import ViewComplaint from "./ViewComplaint";
import ListComplaint from "./ListComplaint";
import RaiseComplaint from "./RaiseComplaint";
const SupervisorNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="MainProfile"
          component={SupervisorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailProfile"
          component={SupervisorProfileDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthleteDetails"
          component={AthleteDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthleteProfile"
          component={AtheleteProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListComplaint"
          component={ListComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewComplaint"
          component={ViewComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RaiseComplaint"
          component={RaiseComplaint}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SupervisorNavigator;
