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
// import { useSelector } from "react-redux";
// import ipconfig from "../../ipconfig";
// import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";
// import mime from "mime";

const CustomNotification = ({ navigation }) => {
    // const Userdata = useSelector((state) => state.user.User);
    // const Atheltedata = useSelector((state) => state.athelte.Athelte);

    const [sportList, setSportList] = useState([]);

    const [value, onChangeText] = React.useState("");
    const [sport, setSport] = useState();
    const [timeSlot, setTimeSlot] = useState();

    // useEffect(() => {
    //     (() => {
    //         var requestOptions = {
    //             method: "GET",
    //             redirect: "follow",
    //         };

    //         fetch(`http://${ip}:9999/getComplaintType`, requestOptions)
    //             .then((response) => response.json())
    //             .then((result) => {
    //                 setcomplaintList(result.data);
    //             })
    //             .catch((error) => console.log("error", error));
    //     })();
    // }, []);

    // const complexId = Atheltedata[0].createdBy.SportComplexId;
    // const pickImage = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [1, 1],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setphoto(result.uri);
    //         setphototype(result.type);
    //     }
    // };

    // const handleSubmit = async () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     let type = mime.getType(photo).split("/")[1];
    //     let photoTo = photo.split("/");
    //     photoTo = photoTo.pop();

    //     var raw = JSON.stringify({
    //         type: complaint,
    //         Description: value,
    //         userId: Userdata._id,
    //         sportsComplex: complexId,
    //         photo: photoTo,
    //         level: 0,
    //         status: 0,
    //     });
    //     var requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow",
    //     };
    //     let response = await fetch(
    //         `http://${ip}:9999/addComplaintApp`,
    //         requestOptions
    //     );
    //     let result = await response.json();
    //     if (result.rcode == 200) {
    //         let response = await FileSystem.uploadAsync(
    //             `http://${ip}:9999/complaintPhoto`,
    //             photo,
    //             {
    //                 fieldName: "photo",
    //                 httpMethod: "POST",
    //                 uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //             }
    //         );
    //         alert("Complaint Added Successfully");
    //         navigation.goBack();
    //     } else {
    //         console.log("error");
    //     }
    // };
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
                    selectedValue={sport}
                    onValueChange={(value, index) => setSport(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}
                >
                    <Picker.Item label="Please select a Sport" value="" />
                    {sportList.map((item, index) => {
                        return (
                            <Picker.Item label={item.Type} value={item._id} key={index} />
                        );
                    })}
                </Picker>
                <Picker
                    selectedValue={timeSlot}
                    onValueChange={(value, index) => setTimeSlot(value)}
                    mode="dropdown" // Android only
                    style={styles.picker}
                >
                    <Picker.Item label="Please select a Time-Slot" value="" />
                    {sportList.map((item, index) => {
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Submit
                    </Text>
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
