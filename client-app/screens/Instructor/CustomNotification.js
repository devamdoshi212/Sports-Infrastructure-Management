import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";

const CustomNotification = ({ navigation }) => {
  const Userdata = useSelector((state) => state.user.User);

  const ip = ipconfig.ip;
  const [value, onChangeText] = React.useState("");

  const [selectedsport, setselectedsport] = useState("");
  const [instructorid, setInstructorid] = useState("");
  const [sport, setSport] = useState([]);
  const [selectedtimeSlot, setselectedTimeSlot] = useState("");
  const [timeSlot, setTimeSlot] = useState([]);
  const [Notification, Setnotification] = useState("");
  const sumbitHandler = () => {
    console.log(instructorid, selectedsport, selectedtimeSlot, Notification);
  };
  useEffect(() => {
    (() => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://${ip}:9999/getInstructorswithsport?userId=${Userdata._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setInstructorid(result.data[0]._id);
          setSport(result.data[0].sports);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  return (
    <>
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
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Custom Notification
            </Text>
          </View>
        </View>
        <Picker
          selectedValue={selectedsport}
          onValueChange={(value, index) => {
            setselectedsport(value);
            // console.log(index);
            setTimeSlot(sport[index - 1].timeSlot);
            // console.log(sport[index - 1].timeSlot);
          }}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select a Sport" value="" />
          {sport.map((item, index) => {
            return (
              <Picker.Item
                label={item.sport.SportName}
                value={item.sport._id}
                key={index}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={selectedtimeSlot}
          onValueChange={(value, index) => {
            setselectedTimeSlot(value);
          }}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select a Time-Slot" value="" />
          {timeSlot.map((item, index) => {
            return (
              <Picker.Item
                label={item.from + "-" + item.to}
                value={item.from + "-" + item.to}
                key={index}
              />
            );
          })}
        </Picker>
        <View
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
              onChangeText={(text) => Setnotification(text)}
              value={Notification}
              multiline
              editable
              placeholder="Type here"
            ></TextInput>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={sumbitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    paddingLeft: "5%",
    height: 50,
    backgroundColor: "#fbe8e0",
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
  picker: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "#f2b69c",
    marginBottom: "5%",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#f2b69c",
    padding: "2%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "10%",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default CustomNotification;
