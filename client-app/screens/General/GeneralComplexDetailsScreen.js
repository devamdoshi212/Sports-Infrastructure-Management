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
  Pressable,
} from "react-native";
import { Rating } from "react-native-ratings";

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
import RatingReview from "./RatingReview";
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
    // console.log(updatedImage);
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: updatedImage }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
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
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={24} />
            </Pressable>
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
              {data.item.taluka},{data.item.district.District}
            </Text>
            <Text style={styles.cardHeaderTextCount}>
              Total Athelte : {details.athleteCount}
            </Text>
          </View>
        </View>
        <View style={styles.dummyCard}>
          <ScrollView>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>About</Text>
              </View>
              <View style={styles.aboutDescription}>
                <View style={styles.aboutDescriptionTopic}>
                  <Text style={styles.aboutDescriptionLable}>Area</Text>
                  <Text style={styles.aboutDescriptionText}>
                    {data.item.area}
                  </Text>
                </View>
              </View>
              <View style={styles.aboutDescription}>
                <View style={styles.aboutDescriptionTopic}>
                  <Text style={styles.aboutDescriptionLable}>Since</Text>
                  <Text style={styles.aboutDescriptionText}>
                    {data.item.operationalSince}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <ScrollView>
                <View>
                  <View style={styles.sport}>
                    {data.item.sports.map((item, index) => (
                      <View key={index}>
                        <View style={styles.cardSport}>
                          <MaterialCommunityIcons
                            style={styles.cardSportColomn1}
                            name={details.availableSports[index].toLowerCase()}
                            size={48}
                          />
                          <View style={styles.cardSportColomn2}>
                            <View style={styles.cardSportColomn2Text}>
                              <Text style={styles.cardSportColomn2TextInfo}>
                                {details.availableSports[index]}
                              </Text>
                              {item.rating && (
                                <View
                                  style={{
                                    backgroundColor: "#fff",
                                    padding: 5,
                                    borderRadius: 10,
                                    marginLeft: "5%",
                                  }}
                                >
                                  <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={20}
                                    showRating={false}
                                    startingValue={item.rating}
                                    minValue={1}
                                    style={styles.starContainer}
                                  />
                                </View>
                              )}
                            </View>
                            <View style={styles.cardSportColomn2TextDetail}>
                              <Text
                                style={styles.cardSportColomn2TextDetailInfo}
                              >
                                Fees : {item.fees}
                              </Text>
                              <Text
                                style={styles.cardSportColomn2TextDetailInfo}
                              >
                                Capacity : {item.capacity}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={goForward}
                            ></TouchableOpacity>
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
                        <View style={styles.loginContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              // alert("booked");
                              navigation.navigate("bookslot", {
                                data: item,
                                complexId: data.item._id,
                              });
                            }}
                          >
                            <Text style={styles.loginLink}>
                              Book Your Slot in {details.availableSports[index]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
            <RatingReview complexId={data.item._id} />
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
    backgroundColor: "#fbe8e0",
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
  loginContainer: {
    marginTop: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
  },
  loginText: {
    fontSize: 16,
    marginRight: 5,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
  card: {
    flexDirection: "column",
    marginTop: "3%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    width: "95%",
    borderRadius: 10,
    backgroundColor: "white",
    borderBottomWidth: 3,
    borderWidth: 1,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fbe8e0",
  },
  aboutDescription: {
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
    flexDirection: "row",
  },
  cardSportColomn2TextInfo: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "5%",
    paddingRight: "15%",
  },
  starContainer: {
    backgroundColor: "#fbe8e0",
    marginTop: "1%",
  },
  cardSportColomn2TextDetail: {
    flexDirection: "row",
  },
  cardSportColomn2TextDetailInfo: {
    fontSize: 16,
    marginLeft: "5%",
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
});

export default GeneralComplexDetailsScreen;
