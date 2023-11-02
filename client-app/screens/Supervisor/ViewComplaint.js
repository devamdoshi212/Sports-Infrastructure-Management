import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
function ViewComplaint({ route, navigation }) {
  const navigate = useNavigation();
  const data = route.params.data;
  const ip = ipconfig.ip;
  const resolveHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: 1,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/updateComplaint/${data._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Complaint Solved Successfully !", "Done!!!", [
          // {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          // },
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => console.log("error", error));
  };

  const forwardHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      level: 1,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/updateComplaint/${data._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Complaint Pass to Manager", "Done!!", [
          // {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          // },
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigate.goBack();
          }}
        >
          <View style={styles.back}>
            <Ionicons name="arrow-back" size={24} />
          </View>
        </Pressable>
        <View style={styles.heading}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            View Complaint
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: "white",
          marginHorizontal: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, alignSelf: "center" }}>
          Name :
        </Text>
        <Text style={{ alignSelf: "center", paddingLeft: 10 }}>
          {data.userId.Name}
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 250,
            marginBottom: 15,
          }}
        >
          <ScrollView>
            <Text style={{ fontWeight: "bold", paddingBottom: 7 }}>
              Complaint:
            </Text>
            <Text>{data.Description}</Text>
          </ScrollView>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 250,
          }}
        >
          <ScrollView>
            <TextInput
              multiline
              editable
              placeholder="Remarks here"
            ></TextInput>
          </ScrollView>
        </View> */}
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginTop: 25,
          }}
        >
          <Button title="Resolve" onPress={resolveHandler}></Button>
          <Button title="Forward" onPress={forwardHandler}></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 0,
    paddingTop: 51,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
});

export default ViewComplaint;
