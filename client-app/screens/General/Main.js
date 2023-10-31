import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import NoAuthTab from "./NoAuthTab";
import AthelteMain from "../Athelte/Main";
const Main = ({ navigation }) => {
  const role = useSelector((state) => state.user.User);
  useEffect(() => {
    console.log(role);
  }, [role]);
  if (role === "") {
    return <NoAuthTab />;
  } else if (role === 0) {
    return <AthelteMain />;
  } else {
    return <NoAuthTab />;
  }
};
export default Main;
