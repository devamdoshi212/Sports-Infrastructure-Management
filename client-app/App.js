import "react-native-gesture-handler";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { NetworkActions } from "./store/Network";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/General/Main";

const Network1 = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getIpAddress = async () => {
      //write down ip in getip function in string form
      dispatch(NetworkActions.getip("192.168.29.60"));
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
