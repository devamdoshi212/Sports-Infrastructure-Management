import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import ipconfig from "../../ipconfig";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
const BadgePerformance = () => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View style={styles.back}>
            <Ionicons name="arrow-back" size={24} />
          </View>
        </Pressable>
        <View style={styles.heading}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Performance</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.feedHeader}>
          <Text style={styles.feedHeaderText}>Sports</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.questionNoBar}
        >
          <View style={styles.feedHeader}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Football</Text>
              </TouchableOpacity>
              {/* ... Other buttons ... */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.teamContainer}>
          <View style={styles.teamRow}>
            {/* <Image source={require("./libertad.png")} style={styles.teamLogo} /> */}
            <Text>Libertad</Text>
          </View>
          <View style={styles.teamRow}>
            {/* <Image source={require("./gremio.png")} style={styles.teamLogo} /> */}
            <Text>Gremio</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>0</Text>
            <Text>:</Text>
            <Text style={styles.scoreText}>3</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>{/* ... Render buttons ... */}</View>
      </View>
      {/* <WebView
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
        javaScriptEnabled={true}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        style={{ width: Dimensions.get("screen").width }}
        source={{
          uri: `http://${ip}:3000/athelteperformance/${Atheltedata[0]._id}/${Userdata._id}`,
        }}
      /> */}
    </View>
  );
};

export default BadgePerformance;
const styles = StyleSheet.create({
  questionNoBar: {
    height: -10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f7f8",
    padding: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fbe8e8",
  },
  body: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "90%",
    paddingLeft: "5%",
    height: 50,
    backgroundColor: "#fbe8e8",
  },
  back: {
    marginRight: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feedHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },
  buttonText: {
    color: "white",
  },
  button: { backgroundColor: "gray", padding: 10, borderRadius: 5, flex: 1 },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 2,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  teamLogo: {
    width: 40,
    height: 40,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
});
