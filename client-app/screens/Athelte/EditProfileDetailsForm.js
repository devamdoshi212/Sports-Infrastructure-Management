import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Alert,
  DatePickerAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import ipconfig from "../../ipconfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { AthelteActions } from "../../store/Athelte";
const EditProfileDetailsForm = ({ navigation }) => {
  const ip = ipconfig.ip;
  const dispatch = useDispatch();

  const AthelteData = useSelector((s) => s.athelte.Athelte);
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
    emergencyNumber: AthelteData[0].emergencyNumber || "",
    address: AthelteData[0].address || "",
    bloodGroup: AthelteData[0].bloodGroup || "",
    height: AthelteData[0].height || "",
    weight: AthelteData[0].weight || "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const handleInput = (field, value) => {
    setFdata({
      ...fdata,
      [field]: value,
    });
  };

  const SumbitHandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      emergencyNumber: fdata.emergencyNumber,
      address: fdata.address,
      bloodGroup: fdata.bloodGroup,
      height: fdata.height,
      weight: fdata.weight,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/updateAthlete/${AthelteData[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.rcode == 200) {
          navigation.goBack();
          dispatch(AthelteActions.getAthelte(result.data));
        } else {
          Alert.alert("Error", "Oops !! Try Again", [
            // {
            //     text: 'Cancel',
            //     onPress: () => console.log('Cancel Pressed'),
            //     style: 'cancel',
            // },
            { text: "Close", onPress: () => {} },
          ]);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("Error", "Oops !! Try Again", [
          // {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          // },
          { text: "Close", onPress: () => {} },
        ]);
      });
  };

  // const handleSignUp = async () => {
  //     if (
  //         fdata.Name == "" ||
  //         fdata.Email == "" ||
  //         fdata.ContactNum == "" ||
  //         fdata.emergencyNumber == "" ||
  //         fdata.DOB == "" ||
  //         fdata.address == "" ||
  //         fdata.bloodGroup == "" ||
  //         fdata.Password == ""
  //     ) {
  //         setErrormsg("All fields are required !");
  //         return;
  //     }
  //     console.log(fdata);

  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     let type = mime.getType(fdata.photo).split("/")[1];

  //     var requestOptions = {
  //         method: "POST",
  //         headers: myHeaders,
  //         body: JSON.stringify({ ...fdata, photoType: type, Role: 0 }),
  //         redirect: "follow",
  //     };

  //     let res = await fetch(`http://${ip}:9999/signup`, requestOptions);
  //     let data = await res.json();
  //     if (data.rcode == 200) {
  //         // let photoTo = fdata.photo.split("/");
  //         // photoTo.pop();
  //         // console.log(data.myPhotoName);
  //         // photoTo.push(data.myPhotoName);
  //         // photoTo = photoTo.join("/");
  //         // let move = await FileSystem.moveAsync({
  //         //   from: fdata.photo,
  //         //   to: photoTo,
  //         // });
  //         let response = await FileSystem.uploadAsync(
  //             `http://${ip}:9999/uploadPhoto`,
  //             fdata.photo,
  //             {
  //                 fieldName: "photo",
  //                 httpMethod: "POST",
  //                 uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  //             }
  //         );
  //         Alert.alert("Alert Title", "Account Created Successfully", [
  //             // {
  //             //     text: 'Cancel',
  //             //     onPress: () => console.log('Cancel Pressed'),
  //             //     style: 'cancel',
  //             // },
  //             { text: "OK", onPress: () => navigation.navigate("Login") },
  //         ]);
  //     }
  // };
  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Edit Your Details</Text>
            <Text style={styles.lable}>Emergency Mobile Number</Text>
            <TextInput
              placeholder="Emergency Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("emergencyNumber", text)}
              value={fdata.emergencyNumber}
              style={styles.input}
            />
            <Text style={styles.lable}>Address</Text>
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
              value={fdata.address}
            />
            <Text style={styles.lable}>Blood Group</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fdata.bloodGroup}
                onValueChange={(itemValue, itemIndex) => {
                  handleInput("bloodGroup", itemValue);
                }}
                style={styles.input}
                placeholder="Select a Blood Group"
              >
                <Picker.Item label={"Select a Blood Group"} />
                {bloodgroups.map((bloodGroup, index) => (
                  <Picker.Item
                    label={bloodGroup}
                    value={bloodGroup}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
            <Text style={styles.lable}>Height</Text>
            <TextInput
              placeholder="Height"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("height", text)}
              value={fdata.height}
              style={styles.input}
            />
            <Text style={styles.lable}>Weight</Text>
            <TextInput
              placeholder="Weight"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("weight", text)}
              value={fdata.weight}
              style={styles.input}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button2}
                onPress={() => {
                  Alert.alert(
                    "Edit Profile Details",
                    "Are you sure to update your profile details?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          SumbitHandler();
                        },
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe8e8",
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
    width: "88%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
  lable: {
    marginBottom: "2%",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button2: {
    marginTop: 10,
    marginLeft: "3%",
    width: "45%",
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
  },
  button1: {
    marginTop: 10,
    marginLeft: "3%",
    width: "45%",
    backgroundColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    flex: 1,
    color: "black",
    width: "100%",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default EditProfileDetailsForm;
