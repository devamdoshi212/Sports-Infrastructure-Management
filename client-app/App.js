import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { NetworkActions } from "./store/Network";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/General/Main";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Network1 = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getIpAddress = async () => {
      //write down ip in getip function in string form
      dispatch(NetworkActions.getip("192.168.151.243"));
    };
    getIpAddress();
  }, []);
  return <Main />;
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
