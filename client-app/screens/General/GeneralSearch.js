import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FlatListScreen from "./FlatListScreen";

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// import LinearGradient from "react-native-linear-gradient";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  Icon,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import FilterModal from "./FilterModal";

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

const MyCarousel = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("getSports");
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState([]);
  const [filterModal, setFilterModal] = useState(false);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);
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
      {filterModal && <FilterModal show={filterModal} />}
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
      />
      <View style={styles.background}>
        <View style={styles.primaryView}></View>
        <View style={styles.ovalSection}>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={styles.button1}
              onPress={() => {
                setSelectedOption("getSports");
                // alert("Facility");
              }}
            >
              <Text style={styles.buttonText1}>Facility</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setSelectedOption("searchSportsComplex");
                // alert("Sports Complex");
              }}
            >
              <Text style={styles.buttonText}>Sports Complex</Text>
            </Pressable>
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
          <FlatListScreen
            optionField={selectedOption}
            searchfield={searchQuery}
            navigate={navigation}
          />
        </View>
      </View>
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  button1: {
    marginTop: 10,
    marginRight: "5%",
    marginLeft: "7%",
    width: "40%",
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
  },
  buttonText1: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    // width: screenWidth,
    // height: screenWidth * 0.1020935961,
    backgroundColor: "gray",
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
    backgroundColor: "gray",
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
    backgroundColor: "#fbe8e8", // #fbe8e8,#fee8e8,#e8fbef
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
    marginTop: "2%",
    alignItems: "center",
    padding: 10,
    // marginLeft: "-8%",
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
  },
});
