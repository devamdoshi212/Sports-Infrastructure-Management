import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
function AthleteViewComplaint({ route, navigation }) {
    const navigate = useNavigation();
    const data = route.params.data;
    const ip = ipconfig.ip;
    const { _id } = useSelector((s) => s.user.User);
    console.log(_id);
    const [remarks, setremarks] = useState("");
    const resolveHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            status: 1,
            remark: remarks,
            userId: _id,
        });

        var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`http://${ip}:9999/updateComplaint/${data._id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                Alert.alert("Complaint Solved Successfully !", "Done!!!", [
                    // {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    // },
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            })
            .catch((error) => console.log("error", error));
    };

    const forwardHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            level: 1,
            remark: remarks,
            userId: _id,
        });

        var requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(`http://${ip}:9999/updateComplaint/${data._id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                Alert.alert("Complaint Pass to Manager", "Done!!", [
                    // {
                    //     text: 'Cancel',
                    //     onPress: () => console.log('Cancel Pressed'),
                    //     style: 'cancel',
                    // },
                    { text: "OK", onPress: () => navigation.goBack() },
                ]);
            })
            .catch((error) => console.log("error", error));
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => {
                        navigate.goBack();
                    }}
                >
                    <View style={styles.back}>
                        <Ionicons name="arrow-back" size={24} />
                    </View>
                </Pressable>
                <View style={styles.heading}>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                        View Complaint
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    backgroundColor: "white",
                    marginHorizontal: 15,
                    borderRadius: 8,
                    marginBottom: 20,
                }}
            >
                <Text style={{ fontWeight: "bold", fontSize: 15, alignSelf: "center" }}>
                    Name :
                </Text>
                <Text style={{ alignSelf: "center", paddingLeft: 10 }}>
                    {data.userId.Name}
                </Text>
            </View>
            <ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        backgroundColor: "white",
                        marginHorizontal: 15,
                        borderRadius: 8,
                        height: 200,
                        marginBottom: 15,
                    }}
                >
                    <ScrollView>
                        <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>
                            Complaint:
                        </Text>
                        <Text>{data.Description}</Text>
                    </ScrollView>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        backgroundColor: "white",
                        marginHorizontal: 15,
                        borderRadius: 8,
                        height: 150,
                    }}
                >
                    <ScrollView>
                        <TextInput
                            multiline={true}
                            editable
                            placeholder="Remarks here"
                            value={remarks}
                            onChangeText={(data) => {
                                setremarks(data);
                            }}
                        ></TextInput>
                    </ScrollView>
                </View>
                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            marginHorizontal: 15,
                            marginTop: -10,
                        }}
                        source={{ uri: `http://${ip}:9999/complaints/${data.photo}` }}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "space-evenly",
                        flexDirection: "row",
                        marginTop: 25,
                    }}
                >
                    <TouchableOpacity
                        onPress={resolveHandler}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Resolve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={forwardHandler}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Forward</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

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
    button: {
        flexDirection: "row",
        marginBottom: 10,
        width: "40%",
        backgroundColor: "#f2b69c",
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});

export default AthleteViewComplaint;
