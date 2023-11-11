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
function ViewComplaint({ route, navigation }) {
    const navigate = useNavigation();
    const data = route.params.data;
    const ip = ipconfig.ip;

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
            <ScrollView>
                <View style={styles.card}>
                    <ScrollView>
                        <Text style={{ fontWeight: "bold", paddingBottom: 7 }}>
                            Complaint:
                        </Text>
                        <Text>{data.Description}</Text>
                    </ScrollView>
                </View>
                <View>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            marginHorizontal: 15,
                            // marginTop: -10,
                        }}
                        source={{ uri: `http://${ip}:9999/complaints/${data.photo}` }}
                    />
                </View>
                <View style={styles.card}>
                    <ScrollView>
                        <Text style={styles.complaintTrackTextCard}>
                            Track Your Complaint :
                        </Text >
                        <View style={styles.complaintTrackTextCard}>
                            <Text style={styles.column1}>
                                DD/MM
                            </Text>
                            <Text style={styles.column2}>
                                Complaint raised by USER
                            </Text>
                        </View>
                        <View style={styles.complaintTrackTextCard}>
                            <Text style={styles.column1}>
                                DD/MM
                            </Text>
                            <Text style={styles.column2}>
                                Complaint Forwarded to Supervisor
                            </Text>
                        </View>
                        <View style={styles.complaintTrackTextCard}>
                            <Text style={styles.column1}>
                                DD/MM
                            </Text>
                            <Text style={styles.column2}>
                                Complaint Forwarded to Manager
                            </Text>
                        </View>
                        <View style={styles.complaintTrackTextCard}>
                            <Text style={styles.column1}>
                                DD/MM
                            </Text>
                            <Text style={styles.column2}>
                                Complaint Solved By Manager
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                {/* <View
                    style={styles.complaintTrack}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 7, paddingTop: "3%", paddingBottom: "3%" }}>
                        Complaint Forwarded to Manager on DDMMYY
                    </Text>
                </View> */}
                {/* <View
                    style={styles.complaintTrack}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 7, paddingTop: "3%", paddingBottom: "3%" }}>
                        Complaint Forwarded to Manager on DDMMYY
                    </Text>
                </View> */}
                {/* <View
                    style={styles.complaintTrack}>
                    <Text style={{ fontWeight: "bold", paddingBottom: 7, paddingTop: "3%", paddingBottom: "3%" }}>
                        Complaint Solved By Supervisor on DDMMYY
                    </Text>
                </View> */}
            </ScrollView>
            {data.status == 0 && (
                <TouchableOpacity style={styles.logout}>
                    <Button color="red" title="Pending" />
                </TouchableOpacity>
            )}
            {data.status == 1 && (
                <TouchableOpacity style={styles.logout}>
                    <Button color="green" title="Solved" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingTop: "10%",
        height: "100%"
    },
    card: {
        flexDirection: "row",
        paddingVertical: "4%",
        paddingHorizontal: 10,
        backgroundColor: "white",
        marginHorizontal: "4%",
        borderRadius: 8,
        height: 250,
        marginBottom: "3%",
        marginTop:"3%"
    },
    complaintTrackTextCard: {
        flex: 1,
        flexDirection: "row",
        fontWeight: "bold",
        paddingBottom: 7,
        paddingTop: "4%",
        paddingBottom: "4%",
        borderBottomWidth: 1
    },
    column1: {
        width: "20%",
        borderRightWidth: 1,
    },
    column2: {
        width: "70%",
        marginLeft:"4%"
    },
    logout: {
        width: "80%",
        alignSelf: "center",
        marginTop: "5%",
        marginBottom: "10%"
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
    heading: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
    },
});

export default ViewComplaint;
