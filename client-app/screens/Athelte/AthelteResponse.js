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
  const [payments, setPayment] = useState([]);
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
  const [parameters, setparameters] = useState([]);
  ["goasl", "defend"];

  // [{paramter:global,value:xsdfssfsd},{paramter:defend,value:bsdbkfds}]
  // ["ads","sdas"]

  const [inputFields, setInputFields] = useState([]);
  const handleInputChange = (index, text) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = text;
    setInputFields(newInputFields);
  };

  useEffect(() => {
    console.log(inputFields);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getPaymentDetailswithsportwithinstructor?athleteId=${Athelte[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPayment(result.data);
        // console.log(result.data);
      })
      .catch((error) => console.log("error", error));
    if (parameters) console.log(parameters);
  }, [parameters]);

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
          onValueChange={(data, index) => {
            setUserResponse(data);
            setInputFields(payments[index - 1].sports.parameters);
            setparameters(payments[index - 1].sports.parameters);
          }}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select your Sport" value="" />
          {payments.map((item, index) => {
            return (
              <Picker.Item
                label={item.sports.SportName}
                value={item.sports._id}
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
              onChangeText={(text) => onChangeText(text)}
              value={value}
              multiline
              editable
              placeholder="Type here"
            ></TextInput>
            <View>
              {inputFields.map((inputField, index) => (
                <View key={index}>
                  <Text>{inputField}</Text>
                  <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    placeholder="Enter a value"
                    value={inputField.value}
                    onChangeText={(text) => handleInputChange(index, text)}
                  />
                </View>
              ))}
            </View>
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
