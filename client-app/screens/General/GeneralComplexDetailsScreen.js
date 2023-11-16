import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Linking,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import {
    Ionicons,
    AntDesign,
    MaterialCommunityIcons,
    Entypo,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ipconfig from "../../ipconfig";
import { useRef } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const GeneralComplexDetailsScreen = ({ navigation, route }) => {
    const [heart, setHeart] = useState(false);

    const { data } = route.params;
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);

    const ip = ipconfig.ip;
    useEffect(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `http://${ip}:9999/sportsComplexDetail?sportsComplex=${data.item._id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                setDetails(result);
            })
            .catch((error) => console.log("error", error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    const openGoogleMaps = () => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${data.item.latitude},${data.item.longitude}`;

        Linking.openURL(mapUrl).catch((err) =>
            console.error("An error occurred: ", err)
        );
    };

    const goForward = () => {
        carouselRef.current.snapToNext();
    };
    const renderItem = ({ item, index }, parallaxProps) => {
        const updatedImage = item.replace("localhost", ip);
        console.log(updatedImage);
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: updatedImage }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text> */}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground
                    style={{
                        width: screenWidth,
                        height: screenWidth * 0.5,
                    }}
                    source={{
                        uri: `http://${ip}:9999${data.item.picture}`,
                    }}
                >
                    <View style={styles.header}>
                        <View>
                            <Ionicons name="arrow-back" size={24} />
                        </View>
                        <View style={{ marginLeft: screenWidth * 0.8 }}>
                            <AntDesign
                                onPress={() => {
                                    setHeart(!heart);
                                }}
                                style={heart ? styles.heartPress : styles.heart}
                                name="hearto"
                                size={24}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardHeaderText}>{data.item.name}</Text>

                    <View style={styles.cardHeaderTextDescriptionView}>
                        <Text style={styles.cardHeaderTextDescription}>
                            {data.item.taluka}
                        </Text>
                        <Text style={styles.cardHeaderTextCount}>
                            Total Athelte : {details.athleteCount}
                        </Text>
                    </View>
                </View>
                <View style={styles.dummyCard}>
                    <ScrollView>
                        <View>
                            <ScrollView>
                                <View>
                                    <View style={styles.sport}>
                                        {data.item.sports.map((item, index) => (
                                            <View>
                                                <View style={styles.cardSport} key={index}>
                                                    <MaterialCommunityIcons
                                                        style={styles.cardSportColomn1}
                                                        name={details.availableSports[index].toLowerCase()}
                                                        size={48}
                                                    />
                                                    <View style={styles.cardSportColomn2}>
                                                        <Text style={styles.cardSportColomn2Text}>
                                                            {details.availableSports[index]}
                                                        </Text>
                                                        <View style={styles.cardSportColomn2TextDetail}>
                                                            <Text style={styles.cardSportColomn2TextInfo}>
                                                                Fees : {item.fees}
                                                            </Text>
                                                            <Text style={styles.cardSportColomn2TextInfo}>
                                                                Capacity : {item.fees} athletes
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity onPress={goForward}>
                                                            {/* <Text>go to next slide</Text> */}
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <Carousel
                                                    ref={carouselRef}
                                                    sliderWidth={screenWidth}
                                                    sliderHeight={screenWidth}
                                                    itemWidth={screenWidth - 10}
                                                    data={item.images}
                                                    renderItem={renderItem}
                                                    hasParallaxImages={true}
                                                    autoplay={true}
                                                    autoplayInterval={5000}
                                                    loop={true}
                                                    loopClonesPerSide={2}
                                                    marginTop="-19%"
                                                    marginBottom="3%"
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>About</Text>
                        </View>
                        <View style={styles.aboutDescription}>
                            <View style={styles.aboutDescriptionTopic}>
                                <Text style={styles.aboutDescriptionLable}>Area</Text>
                                <Text style={styles.aboutDescriptionText}>50 Acres</Text>
                            </View>
                        </View>
                        <View style={styles.aboutDescription}>
                            <View style={styles.aboutDescriptionTopic}>
                                <Text style={styles.aboutDescriptionLable}>Since</Text>
                                <Text style={styles.aboutDescriptionText}>1996</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        openGoogleMaps();
                    }}
                >
                    <Text style={styles.buttonText}>View Location</Text>
                    <View style={styles.buttonImage}>
                        <Entypo backgroundColor={"white"} name="location" size={30} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "2%",
    },
    item: {
        width: screenWidth - 50,
        height: screenWidth - 110,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        marginTop: "15%",
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },
    header: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginLeft: "3%",
        marginTop: "4%",
    },
    heartPress: {
        color: "red",
        fontSize: 28,
    },
    heart: {
        fontSize: 28,
    },
    card: {
        flexDirection: "column",
        marginTop: "1%",
        alignItems: "center",
        alignSelf: "center",
        padding: 10,
        width: "90%",
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
        backgroundColor: "#f3f0f0",
    },
    cardHeader: {
        flexDirection: "column",
        width: "95%",
        alignSelf: "center",
        marginTop: "1%",
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    cardHeaderText: {
        marginTop: "1%",
        fontSize: 24,
        fontWeight: "bold",
    },
    cardHeaderTextDescriptionView: {
        flexDirection: "row",
        fontSize: 14,
        fontWeight: "700",
    },
    cardHeaderTextDescription: {
        flex: 1,
        fontSize: 13,
        fontWeight: "bold",
    },
    cardHeaderTextCount: {
        flex: 1,
        marginLeft: "33%",
    },

    dummyCard: {
        height: screenHeight * 0.55,
        width: "100%",
    },
    sport: {
        width: "90%",
        height: "100%",
        marginLeft: "5%",
        marginTop: "5%",
    },
    cardSport: {
        flexDirection: "row",
        marginBottom: "5%",
    },
    cardSportColomn1: {
        flex: 1,
    },
    cardSportColomn2: {
        flex: 5,
        flexDirection: "column",
    },
    cardSportColomn2Text: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "5%",
    },
    cardSportColomn2TextDetail: {
        flexDirection: "row",
    },
    cardSportColomn2TextInfo: {
        fontSize: 16,
        marginLeft: "5%",
    },
    aboutDescription: {
        // borderWidth: 1,
        flexDirection: "column",
        width: "90%",
        marginLeft: "4%",
    },
    aboutDescriptionTopic: {
        flex: 1,
        flexDirection: "row",
    },
    aboutDescriptionLable: {
        flex: 1,
        fontSize: 20,
        fontWeight: "bold",
    },
    aboutDescriptionText: {
        flex: 1,
        fontSize: 20,
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
    centeredContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default GeneralComplexDetailsScreen;
