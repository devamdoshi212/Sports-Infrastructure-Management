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
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const AthleteDetails = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigation();
    const [athelteList, setAthelteList] = useState([]);
    const Userdata = useSelector((state) => state.user.User);
    const sid = Userdata.SportComplexId;

    const ip = ipconfig.ip;
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `http://${ip}:9999/countOfPayment?sportsComplexId=${sid}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                setAthelteList(result.data);
            })
            .catch((error) => console.log("error", error));
    }, []);

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
                            Athlete Details
                        </Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {athelteList.map((item, index) => (
                        <View style={styles.card} key={index}>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        backgroundColor: pressed ? "#f0f0f0" : "#f8d7c9",
                                        padding: 20,
                                        borderRadius: 10,
                                    },
                                ]}
                                onPress={() => {
                                    navigate.navigate("AthleteProfile", { data: item });
                                }}
                            >
                                <View style={styles.StudentsDetail}>
                                    <View style={styles.leftColumn}>
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: 50,
                                                marginLeft: 1,
                                            }}
                                            source={{
                                                uri: `http://${ip}:9999/${item.athlete[0].baseUrl.slice(
                                                    1
                                                )}`,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.rightColumn}>
                                        <Text style={styles.name}>{item.user[0].Name}</Text>
                                        <Text style={styles.name}>Enrolled Sports :</Text>
                                        {item.sports.map((item, index) => (
                                            <Text style={styles.sportname} key={index}>
                                                {item.SportName}
                                            </Text>
                                        ))}
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
        width: "85%",
    },
    info: {
        paddingRight: 50,
        marginHorizontal: 30,
        alignSelf: "center",
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
    card: {
        borderWidth: 1,
        borderBottomWidth:4,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: "2%",
        marginVertical: "2%",
        backgroundColor: "#fbe8e0",
    },
    StudentsDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftColumn: {
        flex: 1,
    },
    rightColumn: {
        flex: 2,
        paddingLeft: 50,
        paddingBottom: 8,
        marginLeft: 6,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: "1%",
    },
    sportname: {
        fontSize: 16,
        marginTop: "2%",
    },
});

export default AthleteDetails;
