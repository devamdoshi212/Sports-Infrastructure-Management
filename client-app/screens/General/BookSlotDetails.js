import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  Alert,
  DatePickerAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import ipconfig from "../../ipconfig";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const Bookslotdetails = ({ navigation, route }) => {
  const ip = ipconfig.ip;
  console.log(route.params);
  const timeslot = route.params.timeslot;
  const bloodgroups = [
    "A Positive",
    "A Negative",
    "A Unknown",
    "B Positive",
    "B Negative",
    "B Unknown",
    "AB Positive",
    "AB Negative",
    "AB Unknown",
    "O Positive",
    "O Negative",
    "O Unknown",
    "Unknown",
  ];
  const [fdata, setFdata] = useState({
    Name: "",
    Email: "",
    ContactNum: "",
    emergencyNumber: "", //////
    DOB: new Date(),
    address: "",
    bloodGroup: "",
    healthIssue: "",
    disability: "",
    Password: "",
    photo: "",
    phototype: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [errormsg, setErrormsg] = useState(null);

  const handleInput = (field, value) => {
    setFdata({
      ...fdata,
      [field]: value,
    });
  };
  const handleConfirm = (date) => {
    handleInput("DOB", date);
    hideDatePicker();
  };

  const handleSignUp = async () => {
    // if (
    //   fdata.Name == "" ||
    //   fdata.Email == "" ||
    //   fdata.ContactNum == "" ||
    //   fdata.emergencyNumber == "" ||
    //   fdata.DOB == "" ||
    //   fdata.address == "" ||
    //   fdata.bloodGroup == "" ||
    //   fdata.Password == ""
    // ) {
    //   setErrormsg("All fields are required !");
    //   return;
    // }
    console.log(fdata);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Name: fdata.Name,
      Email: fdata.Email,
      ContactNum: fdata.ContactNum,
      Role: 9,
      timeslot: {
        from: timeslot.split("-")[0],
        to: timeslot.split("-")[1],
      },
      duration: route.params.text,
      sport: route.params.sportid,
      SportComplexId: route.params.complexId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/addGuest`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFdata({
        ...fdata,
        photo: result.uri,
        phototype: result.type,
      });
    }
    console.log(result);
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  // const showDatePicker = async () => {
  //   try {
  //     const { action, year, month, day } = await DatePickerAndroid.open({
  //       date: fdata.DOB,
  //     });
  //     if (action !== DatePickerAndroid.dismissedAction) {
  //       const selectedDate = new Date(year, month, day);
  //       handleInput("DOB", selectedDate);
  //     }
  //   } catch ({ code, message }) {
  //     console.warn("Cannot open date picker", message);
  //   }
  // };

  const paymentHandler = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: 10,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const data = await fetch(
      `http://${ip}:9999/onlinepayment/intent`,
      requestOptions
    );
    const response = await data.json();
    if (response.error) {
      Alert.alert("Something went wrong", response.error);
      return;
    }
    console.log(response);

    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: response.paymentIntent,
      defaultBillingDetails: {
        name: "Devam Doshi",
      },
    });
    if (paymentSheetError) {
      Alert.alert("Something went wrong", paymentSheetError.message);
      return;
    }

    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }

    handleSignUp();
  };

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Add Your Details</Text>
            <TextInput
              placeholder="Full Name"
              onChangeText={(text) => handleInput("Name", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.Name}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              onChangeText={(text) => handleInput("Email", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.Email}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("ContactNum", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.ContactNum}
              style={styles.input}
            />
            <TextInput
              placeholder="Emergency Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("emergencyNumber", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.emergencyNumber}
              style={styles.input}
            />

            <TextInput
              placeholder="Address"
              multiline={true}
              numberOfLines={4}
              style={{
                height: 100,
                textAlignVertical: "top",
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                marginBottom: 15,
                padding: 10,
                borderRadius: 5,
              }}
              onChangeText={(text) => handleInput("address", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.address}
            />

            {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}
            <TouchableOpacity style={styles.button} onPress={paymentHandler}>
              <Text style={styles.buttonText}>Confirm Your Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
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
  formContainer: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "88%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },

  loginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    marginRight: 5,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    color: "black",
    width: "75%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Bookslotdetails;
