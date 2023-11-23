import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthTab from "./NoAuthTab";
import AthelteMain from "../Athelte/Main";
import ipconfig from "../../ipconfig";
import SupervisorMain from "../Supervisor/SupervisorMain";
import { AthelteActions } from "../../store/Athelte";
import InstructorMain from "../Instructor/InstructorMain";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
const getLoginData = async () => {
  return await AsyncStorage.getItem("token");
};
import { NotificationActions } from "../../store/NotificationToken";
const Main = ({ navigation }) => {
  const ip = ipconfig.ip;
  // const ip = useSelector((state) => state.network.ipaddress);
  const UserData = useSelector((state) => state.user.User);
  const dispatch = useDispatch();

  const Verify = async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        token: token,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        `http://${ipconfig.ip}:9999/verify`,
        requestOptions
      );
      let data = await response.json();
      dispatch(UserActions.getuserRole(data.data));
    }
  };

  const AthelteData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getAthleteswithpaymentswithsupervisor?userId=${UserData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        // dispatch(UserActions.getuserRole(data.data));
        dispatch(AthelteActions.getAthelte(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    Verify();

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });
    messaging()
      .getToken()
      .then(async (token) => {
        console.log(token);
        dispatch(NotificationActions.gettoken(token));
        // dispatch(setFCM(token));
      });
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body
          );
        }
      });
    // messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //   // Alert.alert(
    //   //   remoteMessage.notification.title,
    //   //   remoteMessage.notification.body
    //   // );
    // });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    return unsubscribe;
  }, []);

  if (UserData.Role === 0) {
    AthelteData();
    return <AthelteMain />;
  } else if (UserData.Role === 1) {
    return <SupervisorMain />;
  } else if (UserData.Role === 2) {
    return <InstructorMain />;
  } else {
    return <NoAuthTab />;
  }
};

export default Main;
