import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const ListComplaint = () => {
    const navigation = useNavigation();
    const [selectedstatus, setselectedstatus] = useState("0");
    const [Complaint, setcomplain] = useState([]);
    const ip = ipconfig.ip;
    const Userdata = useSelector((state) => state.user.User);
    const [refresh, setrefresh] = useState(false);
    const refreshhandler = () => {
        setrefresh(!refresh);
    };
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        fetch(
            `http://${ip}:9999/getAllComplaints?userId=${Userdata._id}&status=${selectedstatus}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setcomplain(result.data);
            })
            .catch((error) => console.log("error", error));
    }, [selectedstatus, refresh]);
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
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AthelteComplaint");
                    }}
                >
                        <View style={styles.complaint}>
                            <Text style={styles.actionText}>New</Text>
                        <AntDesign style={{color:"white", marginLeft:"5%"}} name="plus" size={30} />
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedstatus}
                        onValueChange={(itemValue, itemIndex) => {
                            setselectedstatus(itemValue);
                        }}
                        style={styles.input}
                        placeholder="Select Complaint Status"
                    >
                        <Picker.Item label="Pending" value="0" />
                        <Picker.Item label="Solved" value="1" />
                    </Picker>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {Complaint.map((item, index) => (
                        <View style={styles.card} key={index}>
                            <Pressable
                                onPress={() => {
                                    navigate.navigate("ComplaintView", {
                                        data: item,
                                        refreshhandler: refreshhandler,
                                    });
                                }}
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? "#f8d7c9" : "#f2b69c",
                                        padding: 20,
                                        borderRadius: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <View style={styles.column1}>
                                        <Text style={styles.lable}>Type</Text>
                                        <Text style={styles.lable}>{item.type.Type}</Text>
                                    </View>
                                    <View style={styles.column2}>
                                        <Text style={styles.label}>{item.createdAt.split("T")[0]}</Text>
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
        width: "85%",
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
        width: "80%",
    },
    complaint: {
        flexDirection: "row",
        width: "80%",
        height:40,
        borderRadius: 10,
        backgroundColor: "#f2b69c",
        paddingTop:"5%",
    },
    actionText: {
        marginLeft:"5%",
        fontWeight: "bold",
        fontSize: 20,
        color:"#fff"
    },
    pickerContainer: {
        backgroundColor: "#f2b69c",
        borderRadius: 5,
        marginBottom: 15,
        width: "90%",
        marginLeft: "5%",
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
        justifyContent: "space-between",
        width: "90%",
        marginTop: "2%",
        marginBottom: "2%",
        marginLeft: "5%",
    },
    column1: {
        width: "40%",
    },
    column2: {
        width: "40%",
    },
    column3: {
        marginLeft: "10%",
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

export default ListComplaint;
