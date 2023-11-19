import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
// import ProfileDetails from "./ProfileDetails";
import SupervisorProfile from "./SupervisorProfile";
import SupervisorProfileDetail from "./SupervisorProfileDetail";
import AthleteDetails from "./AthleteDetails";
import AtheleteProfile from "./AtheleteProfile";
import ListComplaint from "./ListComplaint";
import RaiseComplaint from "./RaiseComplaint";
import Attendance from "./Attendance";
import SportAttendance from "./SportAttendance";
import SupervisorViewComplaint from "./SupervisorViewComplaint";
import AthleteViewComplaint from "./AthleteViewComplaint";
import AthleteListComplaint from "./AthleteListComplaint";
import Response from "./Response";
import AddAthlete from "./AddAthelte";
import EventPage from "./EventPage";
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
          name="AddAthlete"
          component={AddAthlete}
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
          name="SupervisorViewComplaint"
          component={SupervisorViewComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthelteListComplaint"
          component={AthleteListComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthelteViewComplaint"
          component={AthleteViewComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RaiseComplaint"
          component={RaiseComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventPage"
          component={EventPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Response"
          component={Response}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default SupervisorNavigator;
