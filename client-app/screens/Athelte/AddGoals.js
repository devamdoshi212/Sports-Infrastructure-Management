import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Pressable
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
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
                Alert.alert("Goal Added", "Goal Added Successfully", [
                    // {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    // },
                    { text: "OK", onPress: () => navigation.navigate("Goals") },
                ]);
            })
            .catch((error) => console.log("error", error));
        console.log(data);
    };

    return (
        <View>
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
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.heading}>Create Goal</Text>
                        <Text style={styles.targetDate}>Title</Text>
                        <TextInput
                            placeholder="Title"
                            onChangeText={(text) => handleInput("Title", text)}
                            // onFocus={() => setErrormsg(null)}
                            value={data.Title}
                            style={styles.input}
                        />
                        <Text style={styles.targetDate}>Description</Text>
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
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={submitHandler}
                        >
                            <Text style={styles.buttonText}>Add Goal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
        height: 50,
        backgroundColor: "#fbe8e0",
    },
    back: {
        marginHorizontal: 4,
        alignSelf: "center",
        marginTop:"50%",
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#fbe8e0",
        // marginTop: "7%",
        height: "100%",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
    },
    formContainer: {
        backgroundColor: "#fbe8e8",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
        marginTop: "25%",
    },
    heading: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    targetDate: {
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: "bold",
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
