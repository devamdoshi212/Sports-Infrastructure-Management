import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const AthleteListComplaint = () => {
    const [Complaint, setcomplain] = useState([]);
    const ip = ipconfig.ip;
    const Userdata = useSelector((state) => state.user.User);
    const sid = Userdata.SportComplexId;

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch(
            `http://${ip}:9999/getAllComplaints?sportsComplex=${sid}&level=0&status=0`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setcomplain(result.data);
            })
            .catch((error) => console.log("error", error));
    }, []);
    const navigate = useNavigation();
    return (
        <>
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
                            Complaint List
                        </Text>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {Complaint.map((item, index) => (
                        <View style={styles.card} key={index}>
                            <Pressable
                                onPress={() => {
                                    navigate.navigate("AthelteViewComplaint", { data: item });
                                }}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? "#f0f0f0" : "white",
                                        padding: 20,
                                        borderRadius: 10,
                                    },
                                ]}
                            >
                                {/* <View style={styles.card}> */}

                                <View style={styles.row}>
                                    <View style={styles.column1}>
                                        <Text style={styles.label}>{item.userId.Name}</Text>
                                    </View>
                                    <View style={styles.column2}>
                                        <Text style={styles.input}>Type</Text>
                                        <Text style={styles.input}>{item.type.Type}</Text>
                                    </View>
                                    <View style={styles.column3}>
                                        <Entypo style={{ color: "#0054a8" }} name="eye" size={24} />
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
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
        marginVertical: 5,
    },
    inline: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    column1: {
        width: "40%",
    },
    column2: {
        width: "50%",
    },
    label: {
        fontWeight: "bold",
        fontSize: 17,
    },
    input: {
        marginLeft: 6,
        textAlign: "center",
    },
});

export default AthleteListComplaint;
