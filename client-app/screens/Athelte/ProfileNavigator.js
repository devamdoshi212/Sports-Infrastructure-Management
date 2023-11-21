import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import PaymentHistory from "./PaymentHistory";
import Complaint from "./Complaint";
import SportComplexDetail from "./SportComplexDetail";
import SportEnroll from "./SportEnroll";
import ListComplaint from "./ListComplaint";
import ViewComplaint from "./ViewComplaint";
import IDCard from "./IDCard";
import AthleteResponse from "./AthelteResponse";
import LeaderBoard from "./LeaderBoard";
import SatisfiedResponse from "./SatisfiedResponse";
import Goals from "./Goals";
import AddGoals from "./AddGoals";
import GoalScreen from "./GoalDetails";
import SportwiseLeaderBoard from "./SportswiseLeaderBoard";
import EditProfileDetailsForm from "./EditProfileDetailsForm";
import BadgePerformance from "./BadgePerformance";
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
          name="EditForm"
          component={EditProfileDetailsForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AthelteComplaint"
          component={Complaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportsComplexDetails"
          component={SportComplexDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportEnroll"
          component={SportEnroll}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplaintList"
          component={ListComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComplaintView"
          component={ViewComplaint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IDCard"
          component={IDCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExitForm"
          component={AthleteResponse}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportwiseLeaderBoard"
          component={SportwiseLeaderBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Goals"
          component={Goals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddGoals"
          component={AddGoals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoalDetail"
          component={GoalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Performance"
          component={BadgePerformance}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
