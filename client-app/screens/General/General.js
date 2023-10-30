import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import Login from "./Login";
import { View } from "react-native";
const Tab = createBottomTabNavigator();

const General = () => {
  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Search} />
        <Tab.Screen name="Settings" component={Login} />
      </Tab.Navigator>
    </View>
  );
};
export default General;
