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
import ipconfig from "../../ipconfig";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Leaderboard from "react-native-leaderboard";
const ip = ipconfig.ip;
const LeaderBoard = ({ navigation }) => {
    const leaderboard = [
        {
            name: "We Tu Lo",
            score: null,
            iconUrl:
                "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg",
        },
        {
            name: "Adam Savage",
            score: 12,
            iconUrl:
                "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
        },
        {
            name: "Derek Black",
            score: 244,
            iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png",
        },
        {
            name: "Erika White",
            score: 0,
            iconUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-",
        },
        {
            name: "Jimmy John",
            score: 20,
            iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png",
        },
        {
            name: "Joe Roddy",
            score: 69,
            iconUrl: "https://static.witei.com/static/img/profile_pics/avatar4.png",
        },
        {
            name: "Ericka Johannesburg",
            score: 101,
            iconUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz",
        },
        {
            name: "Tim Thomas",
            score: 41,
            iconUrl: "http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png",
        },
        {
            name: "John Davis",
            score: 80,
            iconUrl:
                "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png",
        },
        {
            name: "Tina Turner",
            score: 22,
            iconUrl:
                "https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png",
        },
        {
            name: "Harry Reynolds",
            score: null,
            iconUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp",
        },
        {
            name: "Betty Davis",
            score: 25,
            iconUrl:
                "https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300",
        },
        {
            name: "Lauren Leonard",
            score: 30,
            iconUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-",
        },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(`http://${ip}:9999/ratingForAll`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result.ratings);
            })
            .catch((error) => console.log("error", error));
    }, []);
    console.log(data[0]);
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
                        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Ranking</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.label}>4th</Text>
                    <View style={styles.profileImage}>
                        <Image
                            style={{
                                width: 125,
                                height: 125,
                                borderRadius: 62.5,
                                borderColor: "#fbe8e0",
                                borderWidth: 5,
                            }}
                            source={require("../../assets/icon.png")}
                        />
                    </View>
                    <Text style={styles.label}>24 pts</Text>
                </View>
                <Leaderboard
                    labelBy="name"
                    sortBy="score"
                    data={leaderboard}
                    icon="iconUrl"
                    onRowPress={(item, index) => {
                        alert(item.name + " clicked");
                    }}
                    evenRowColor="#edfcf9"
                    oddRowColor="#ffffff"

                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fbe8e0",
        paddingTop:"5%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
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
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 5,
        height: "22%",
        flexDirection: "row",
        width: "95%",
        marginLeft: "2.5%"
    },
    profileImage: {
        flex: 1,
        alignSelf: "center",
        borderRadius: 15,
        borderColor: "white",
    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
        alignSelf: "center",
        textAlign:"center",
    },
});

export default LeaderBoard;
