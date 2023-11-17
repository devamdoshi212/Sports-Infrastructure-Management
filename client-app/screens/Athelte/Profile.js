import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Dimensions,
} from "react-native";
import ipconfig from "../../ipconfig";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
async function removeItem() {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        // Handle the error
    }
}
function Profile({ navigation }) {
    const dispatch = useDispatch();
    const ip = ipconfig.ip;
    const Userdata = useSelector((state) => state.user.User);
    const Atheltedata = useSelector((state) => state.athelte.Athelte);
    const [image, setimage] = useState("./../../assets/icon.png");

    const ProfileDetailHandler = () => {
        console.log("hello");
        navigation.navigate("DetailProfile");
    };

    useEffect(() => {
        // console.log(Atheltedata[0].baseUrl);
        const i = Atheltedata[0].baseUrl.slice(1);
        console.log(i);
        setimage(i);
    }, [image]);
    // console.log(Userdata.base)
    const handleLogout = () => {
        dispatch(UserActions.getuserRole({ Role: "" }));
        removeItem();
        // Implement your logout logic here
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity onPress={ProfileDetailHandler}>
                    {/* <View style={styles.profileInfo}>
                        <View style={styles.leftColumn}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    marginLeft: 1,
                                }}
                                source={{ uri: `http://${ip}:9999/${image}` }}
                            />
                        </View>
                        <View style={styles.rightColumn}>
                            <Text style={styles.name}>Name : {Userdata.Name}</Text>
                            <Text style={styles.name}>Email : {Userdata.Email}</Text>
                            <Text style={styles.name}>ContactNo : {Userdata.ContactNum}</Text>
                        </View>
                    </View> */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileImage}>
                        <Image
                                style={{
                                    width: 125,
                                    height: 125,
                                    borderRadius: 62.5
                                }}
                            source={{ uri: `http://${ip}:9999/${image}` }}
                        />
                        </View>
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginTop: "1%" }}>{Userdata.Name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {Atheltedata[0].createdBy && (
                    <View style={styles.card}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("LeaderBoard");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Leaderboard</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SportsComplexDetails");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Sport Complex Details</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("IDCard");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>ID card</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SportEnroll");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Enrolled Sports</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("PaymentHistory");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Payment History</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AthelteComplaint");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Raise Complaint</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ComplaintList");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Complaint History</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ExitForm");
                            }}
                        >
                            <View style={styles.row}>
                                <Text style={styles.actionText}>Athelte Response</Text>
                                <MaterialIcons name="navigate-next" size={24} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        marginTop: 25,
    },
    profileCard: {
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 15,
        marginVertical: 5,
        marginTop: "20%",
        // marginBottom: "2%",
        paddingBottom: "5%",
        backgroundColor: "#f3f0f0",
        flexDirection: "column"
    },
    profileImage: {
        flex: 1,
        alignSelf: "center",
        alignSelf: "center",
        borderRadius: 15,
        marginTop:"-15%"
    },
    card: {
        flexDirection: "column",
        marginTop: "1%",
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        width: "95%",
        borderRadius: 10,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 15,
        marginVertical: 5,
        marginBottom: "2%",
        paddingBottom: "5%",
        backgroundColor: "#fbe8e0",
    },
    profileInfo: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center",
        marginTop: "8%",
        justifyContent: "space-between",
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 2,
        paddingLeft: 20,
        paddingBottom: 8,
        marginLeft: 6,
    },

    name: {
        fontSize: 16,
        color: "grey",
        marginTop: 5,
    },
    row: {
        width: "120%",
        marginTop: "5%",
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingVertical: "3%",
    },
    actionText: {
        width: "75%",
        fontWeight: "bold",
        fontSize: 15,
    },
    logout: {
        width: "40%",
        alignSelf: "center",
        marginTop: "15%",
    },
    button: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: "3%",
        width: "94%",
        height: screenHeight * 0.06,
        backgroundColor: "#000",
        borderRadius: 3,
        padding: 10,
    },
    buttonText: {
        flex: 1,
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    buttonImage: {
        textAlign: "center",
        color: "#fff",
        // fontSize: 24,
        // fontWeight: "bold",
    },
});

export default Profile;
