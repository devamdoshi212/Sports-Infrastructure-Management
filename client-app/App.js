import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "./store";
import { NetworkActions } from "./store/Network";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screens/General/Main";
import { PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StripeProvider } from "@stripe/stripe-react-native";
LogBox.ignoreLogs([
  'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package.",
]);
const Network1 = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    const getIpAddress = async () => {
      //write down ip in getip function in string form
      dispatch(NetworkActions.getip("192.168.151.243"));
    };
    getIpAddress();
  }, []);
  return <Main />;
};

const STRIPE_KEY =
  "pk_test_51OHNVKSIijB4dZ7nuHBY1SWlQ8Jk0s0vVK5MMqy2fA81z0SfazlNSqilcLW4Do6bBpiKaM1PTDZ8sTdyGDUURdG400nSDgpU2Q";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <NavigationContainer>
          <Network1 />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
