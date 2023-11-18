import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Pressable,
} from "react-native";
import ipconfig from "../../ipconfig";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QRCodeGenerator from "./QRCodeUser";

const ProfileDetails = ({ navigation }) => {
    const ip = ipconfig.ip;
    const Userdata = useSelector((state) => state.user.User);
    const Atheltedata = useSelector((state) => state.athelte.Athelte);
    const [supervisorId, setsupervisorId] = useState("");
    const [image, setimage] = useState("./../../assets/icon.png");

    useEffect(() => {
        if (Atheltedata[0].createdBy) {
            setsupervisorId(Atheltedata[0].createdBy._id);
        }
        const i = Atheltedata[0].baseUrl.slice(1);
        setimage(i);
    }, [image]);
    return (
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
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>Your Profile</Text>
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.photo}>
                    <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 60,
                                marginHorizontal: 15,
                                marginTop: -10
                            }}
                            source={{ uri: `http://${ip}:9999/${image}` }}
                        />
                        {supervisorId && <QRCodeGenerator value={supervisorId} />}
                    </View>
                </View>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name :</Text>
                        <Text style={styles.input}>{Userdata.Name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email :</Text>
                        <Text style={styles.input}>{Userdata.Email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact No :</Text>
                        <Text style={styles.input}>{Userdata.ContactNum}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Blood Group :</Text>
                        <Text style={styles.input}>{Atheltedata[0].bloodGroup}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address :</Text>
                        <Text style={styles.input}>{Atheltedata[0].address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Emergency No :</Text>
                        <Text style={styles.input}>{Atheltedata[0].emergencyNumber}</Text>
                    </View>
                    <View style={{ alignSelf: "center", marginTop: 10 }}>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <View >
                            <Text style={styles.buttonText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 30,
        marginVertical: 20,
    },
    photo: {
        height: "20%",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 20,
        marginTop: 50,
        marginBottom: 60,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        fontSize: 17,
    },
    input: {
        marginLeft: 6,
    },
    button: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: "3%",
        width: "94%",
        backgroundColor: "#f2b69c",
        borderRadius: 5,
        padding: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 15,
        alignSelf: "center",
        marginLeft: "50%",
    },
});

export default ProfileDetails;
