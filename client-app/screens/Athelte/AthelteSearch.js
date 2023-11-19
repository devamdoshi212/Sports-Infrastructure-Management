import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// import LinearGradient from "react-native-linear-gradient";
import { Feather } from "@expo/vector-icons";
import FilterModal from "../General/FilterModal";
import FlatListAthelte from "./FlatListAthelte";

const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

const { width: screenWidth } = Dimensions.get("window");

const AthelteSearch = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState("getSports");
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);
  useEffect(() => {
    const { lat, long, distance, district, Category } = route.params || {};
    if (lat) {
      // console.log(lat, long);
      setlat(lat);
      setlong(long);
      setDistance(distance);
    }
    if (district) {
      setSearchQuery(district);
    }
    if (Category) {
      setCategory(Category);
    }
  }, [route.params]);
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.illustration }}
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
      {/* {filterModal && <Modal show={filterModal} />} */}
      {filterModal && (
        <FilterModal show={filterModal} selectedOption={selectedOption} />
      )}
      <TouchableOpacity onPress={goForward}>
        {/* <Text>go to next slide</Text> */}
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={5000}
        loop={true}
        loopClonesPerSide={2}
      />
      <View style={styles.background}>
        <View style={styles.primaryView}></View>
        <View style={styles.ovalSection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={
                selectedOption == "getSports"
                  ? styles.button
                  : styles.onpressbutton
              }
              onPress={() => {
                setSelectedOption("getSports");
              }}
            >
              <Text style={styles.buttonText}>Facility</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedOption == "searchSportsComplex"
                  ? styles.button
                  : styles.onpressbutton
              }
              onPress={() => {
                setSelectedOption("searchSportsComplex");
              }}
            >
              <Text style={styles.buttonText}>Sports Complex</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              fontSize={15}
              placeholder="Search..."
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
            <Pressable
              onPress={() => {
                setFilterModal(!filterModal);
              }}
            >
              <Feather
                // style={{ marginLeft: "70%" }}
                color={"black"}
                name="filter"
                size={25}
              />
            </Pressable>
          </View>
          {/* //FlatListScreen */}
          <FlatListAthelte
            optionField={selectedOption}
            searchfield={searchQuery}
            navigate={navigation}
            lat={lat}
            distance={distance}
            long={long}
            category={category}
          />
        </View>
      </View>
    </View>
  );
};

export default AthelteSearch;

const styles = StyleSheet.create({
  onpressbutton: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    height: "90%",
  },
  button: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "#f2b69c",
    borderRadius: 10,
    padding: 5,
    height: "90%",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // width: screenWidth,
    // height: screenWidth * 0.1020935961,
    backgroundColor: "#fff6f3",
    // flexDirection: "row",
    // justifyContent: "space-around",
    // borderTopLeftRadius: -50,
    // borderTopRightRadius: -50
  },
  input: {
    width: "90%",
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
  background: {
    backgroundColor: "#fff6f3",
    // flex: 1,
    flexDirection: "column",
  },
  primaryView: {
    backgroundColor: "#ffffff",
    // flex: 1
  },
  ovalSection: {
    // flex: 3,
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#f8d7c9", // #fbe8e8,#fee8e8,#e8fbef
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
    // borderRadius: screenWidth * 0.1,
    // borderCurve: "circular",
    width: screenWidth,
    height: 550,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginLeft: "7%",
    marginTop: "3%",
    alignItems: "center",
    padding: 10,
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
  },
});
