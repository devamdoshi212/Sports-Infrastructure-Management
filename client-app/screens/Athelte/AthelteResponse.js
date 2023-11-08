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
import { useNavigation } from "@react-navigation/native";

const AthleteResponse = () => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const Athelte = useSelector((state) => state.athelte.Athelte);
  const sportList = [
    "Cricket",
    "Basketball",
    "Football",
    "Tennis",
    "Volley Ball",
    "Table Tennis",
  ];
  const [value, onChangeText] = React.useState("");
  const [userResponse, setUserResponse] = useState();
  const submitHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sportId: userResponse,
      athleteId: Athelte[0]._id,
      sportComplexId: Athelte[0].createdBy.SportComplexId,
      remarks: value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/remarkRatingByAthlete`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
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
              Athlete Response
            </Text>
          </View>
        </View>
        <Picker
          selectedValue={userResponse}
          onValueChange={(value) => setUserResponse(value)}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select your Sport" value="" />
          {/* {sportList.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })} */}
          <Picker.Item label="Cricket" value="6540e2b1af277f6329395500" />
          <Picker.Item label="Basketball" value="6540e344af277f6329395503" />
          <Picker.Item label="Football" value="6540e302959854c7bc0be7fb" />
          <Picker.Item label="Volley Ball" value="6540e378959854c7bc0be807" />
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
        <TouchableOpacity
          style={{ width: "40%", alignSelf: "center", paddingVertical: "10%" }}
        >
          <Button title="Submit" onPress={submitHandler} />
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
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  uploadButton: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#3498db",
    padding: "2%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "2%",
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
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  multiline: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 200,
  },
});

export default AthleteResponse;
