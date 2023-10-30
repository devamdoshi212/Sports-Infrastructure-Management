import { StyleSheet, Text, View } from "react-native";
import Athelte from "./screens/Athelte/Athelte";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { NetworkActions } from "./store/Network";
import { NavigationContainer } from "@react-navigation/native";
import General from "./screens/General/General";

const Network1 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getIpAddress = async () => {
      //write down ip in getip function in string form
      dispatch(NetworkActions.getip("192.168.151.243"));
    };
    getIpAddress();
  }, []);
  return (
    <View>
      <General />
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Network1 />
      </NavigationContainer>
    </Provider>
  );
}
