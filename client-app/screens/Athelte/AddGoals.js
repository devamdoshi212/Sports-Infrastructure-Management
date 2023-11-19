import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";

const AddGoals = ({ navigation }) => {
  const [data, setData] = useState({
    Title: "",
    Description: "",
    Date: new Date(),
  });
  const { _id } = useSelector((state) => state.athelte.Athelte[0]);

  const handleConfirm = (date) => {
    handleInput("Date", date);
    hideDatePicker();
  };
  const handleInput = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const ip = ipconfig.ip;
  const submitHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: data.Title,
      description: data.Description,
      targetdate: data.Date,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/goalOfAthlete?id=${_id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        navigation.navigate("Goals");
      })
      .catch((error) => console.log("error", error));
    console.log(data);
  };

  return (
    <View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Create Goal</Text>
            <TextInput
              placeholder="Title"
              onChangeText={(text) => handleInput("Title", text)}
              // onFocus={() => setErrormsg(null)}
              value={data.Title}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              onChangeText={(text) => handleInput("Description", text)}
              // onFocus={() => setErrormsg(null)}
              value={data.Description}
              style={styles.input}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.targetDate}>Select Your Target Date</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <View style={styles.dobContainer}>
                <TextInput
                  placeholder="Select Your Target Date"
                  editable={false}
                  style={{ color: "black" }}
                  value={data.Date.toDateString()}
                ></TextInput>
                <Icon
                  name="calendar"
                  size={24}
                  color="#3498db"
                  style={styles.calendaricon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={submitHandler}
            >
              <Text style={styles.buttonText}>Add Goal 🥱</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // paddingVertical: 50,
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe8e8",
    paddingBottom: 20,
  },
  targetDate: {
    marginBottom: 10,
    marginLeft: 5,
  },

  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    marginTop: 20,
  },

  heading: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "#f2b69c",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default AddGoals;
