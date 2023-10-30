import { StyleSheet, Text, View } from "react-native";
import Athelte from "./screens/Athelte/Athelte";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { NetworkActions } from "./store/Network";

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
    <View style={styles.container}>
      <Athelte />
    </View>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <Network1 />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
