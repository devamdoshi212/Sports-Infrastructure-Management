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

const Complaint = ({ navigation }) => {
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);

  const complaintList = ["Maintenance", "Behaviour", "Refund", "Inquiry"];
  const [value, onChangeText] = React.useState("");
  const [complaint, setCompalint] = useState();
  const ip = ipconfig.ip;

  const complexId = Atheltedata[0].createdBy.SportComplexId;

  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      type: complaint,
      Description: value,
      userId: Userdata._id,
      sportsComplex: complexId,
      level: 0,
      status: 0,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://${ip}:9999/addComplaint`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Complaint Added Succesfully");
        navigation.goBack();
      })
      .catch((error) => console.log("error", error));
  };
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
              Raise Complaint
            </Text>
          </View>
        </View>
        <Picker
          selectedValue={complaint}
          onValueChange={(value, index) => setCompalint(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select type" value="Unknown" />
          {complaintList.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
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
              onChangeText={(text) => onChangeText(text)}
              value={value}
              multiline
              editable
              placeholder="Type here"
            ></TextInput>
          </ScrollView>
        </View>
        <TouchableOpacity  style={{width:"30%",alignSelf:"center",paddingVertical:"20%"}}>
            <Button title="Submit" onPress={handleSubmit}  />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 50,
    backgroundColor: "#f0f0f0",
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
  scrollContainer: {
    // flexGrow: 1,
    width: "90%",
    padding: 10,
    borderWidth: 1,
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    marginVertical: 30,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 15,
    width: "90%",
    marginTop: "3%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  multiline: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 200,
  },
});

export default Complaint;
