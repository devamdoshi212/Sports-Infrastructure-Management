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
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const Complaint = ({ navigation }) => {
  const Userdata = useSelector((state) => state.user.User);
  const [complaintList, setcomplaintList] = useState([]);
  const [value, onChangeText] = React.useState("");
  const [complaint, setCompalint] = useState();
  const [photo, setphoto] = useState("");
  const [phototype, setphototype] = useState("");
  const ip = ipconfig.ip;

  const complexId = Userdata.SportComplexId;

  useEffect(() => {
    (() => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`http://${ip}:9999/getComplaintType`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setcomplaintList(result.data);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setphoto(result.uri);
      setphototype(result.type);
    }
  };

  const handleSubmit = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let type = mime.getType(photo).split("/")[1];
    let photoTo = photo.split("/");
    photoTo = photoTo.pop();

    var raw = JSON.stringify({
      type: complaint,
      Description: value,
      userId: Userdata._id,
      sportsComplex: complexId,
      photo: photoTo,
      level: 1,
      status: 0,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let response = await fetch(
      `http://${ip}:9999/addComplaintApp`,
      requestOptions
    );
    let result = await response.json();
    if (result.rcode == 200) {
      let response = await FileSystem.uploadAsync(
        `http://${ip}:9999/complaintPhoto`,
        photo,
        {
          fieldName: "photo",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }
      );
      alert("Complaint Added Succesfully");
      navigation.goBack();
    } else {
      console.log("error");
    }
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
          <Picker.Item label="Please select your Complaint Type" value="" />
          {complaintList.map((item, index) => {
            return (
              <Picker.Item label={item.Type} value={item._id} key={index} />
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
          </ScrollView>
        </View>
        {photo && <Image source={{ uri: photo }} style={styles.photo} />}
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "30%", alignSelf: "center", paddingVertical: "20%" }}
        >
          <Button title="Submit" onPress={handleSubmit} />
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
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
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

export default Complaint;
