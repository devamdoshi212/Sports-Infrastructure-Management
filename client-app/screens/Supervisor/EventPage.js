import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const EventPage = ({ navigation }) => {
    const ip = ipconfig.ip;
    const [data, setData] = useState([]);
    const { SportComplexId } = useSelector((state) => state.user.User);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `http://${ip}:9999/getUpdates?level=2&sportComplexId=${SportComplexId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setData(result.data);
            })
            .catch((error) => console.log("error", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
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
                            Updates/News
                        </Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {data.map((item, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                style={styles.eventImage}
                                source={{
                                    uri: item.image.replace("localhost", ip),
                                }}
                            />
                            <View style={styles.row}>
                                <Text style={styles.label}>Title :</Text>
                                <Text style={styles.input}>{item.title}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={styles.input}>{item.description}</Text>
                            </View>
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
        paddingTop: "7%",
        backgroundColor: "#fbe8e0",
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
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
    card: {
        backgroundColor: "#f8d7c9",
        borderWidth: 1,
        borderBottomWidth: 4,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    eventImage: {
        width: "100%",
        aspectRatio: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginLeft: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 17,
    },
    input: {
        marginLeft: 6,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default EventPage;
