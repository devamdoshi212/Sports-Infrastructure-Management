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
import CheckBox from "react-native-check-box";
const AthleteResponse = () => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const [payments, setPayment] = useState([]);

  const Athelte = useSelector((state) => state.athelte.Athelte);

  const [value, onChangeText] = React.useState("");

  const [selectedSportParameters, setSelectedSportParameters] = useState({});
  const [selectedSports, setSelectedSports] = useState([]);

  const handleParameterChange = (sportId, parameter, text) => {
    setSelectedSportParameters((prevState) => ({
      ...prevState,
      [sportId]: {
        ...prevState[sportId],
        [parameter]: parseInt(text),
      },
    }));
  };
  const handleSportSelection = (sportId, sportName) => {
    const newSelectedSports = [...selectedSports];
    const index = newSelectedSports.indexOf(sportId);
    if (index === -1) {
      newSelectedSports.push(sportId);
    } else {
      newSelectedSports.splice(index, 1);
    }
    setSelectedSports(newSelectedSports);

    // Clear selected parameters when unchecking a sport
    if (index !== -1) {
      setSelectedSportParameters((prevState) => {
        const newState = { ...prevState };
        delete newState[sportId];
        return newState;
      });
    }
  };

  useEffect(() => {
    // console.log(payments);

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
  }, []);

  const submitHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const formattedData = selectedSports.map((sportId) => {
      const parameters =
        selectedSportParameters[sportId] &&
        Object.keys(selectedSportParameters[sportId]).map((parameter) => ({
          parameter,
          value: selectedSportParameters[sportId][parameter],
        }));

      return {
        sportId,
        parameters: parameters || [],
      };
    });
    console.log(formattedData);
    formattedData.forEach((item) => {
      console.log("Sport ID:", item.sportId);
      console.log("Parameters:");

      item.parameters.forEach((parameter) => {
        console.log("Parameter:", parameter.parameter);
        console.log("Value:", parameter.value);
      });
    });
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
        <View>
          <ScrollView>
            {payments.map((item, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <CheckBox
                  isChecked={selectedSports.includes(item.sports._id)}
                  onClick={() =>
                    handleSportSelection(item.sports._id, item.sports.SportName)
                  }
                  checkBoxColor="blue" // Set your desired checkbox color
                />
                <Text>{item.sports.SportName}</Text>
                {selectedSports.includes(item.sports._id) && (
                  <View>
                    <TextInput
                      onChangeText={(text) => onChangeText(text)}
                      value={value}
                      multiline
                      editable
                      placeholder="Type here"
                    />
                    {item.sports.parameters.map((parameter, parameterIndex) => (
                      <View key={parameterIndex}>
                        <Text>{parameter}</Text>
                        <TextInput
                          keyboardType="numeric"
                          style={{
                            height: 40,
                            borderColor: "gray",
                            borderWidth: 1,
                          }}
                          placeholder="Enter a value"
                          value={
                            selectedSportParameters[item.sports._id] &&
                            selectedSportParameters[item.sports._id][parameter]
                              ? selectedSportParameters[item.sports._id][
                                  parameter
                                ].toString()
                              : ""
                          }
                          onChangeText={(text) =>
                            handleParameterChange(
                              item.sports._id,
                              parameter,
                              text
                            )
                          }
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
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
    paddingVertical: 50,
    backgroundColor: "#fbe8e0",
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
    backgroundColor: "#fbe8e0",

    alignItems: "center",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
    marginLeft: "10%",
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
    width: "70%",
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
    // backgroundColor: "#f8d7c9",
    backgroundColor: "#f2b69c",
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
