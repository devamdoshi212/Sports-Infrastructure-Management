import { useEffect, useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ipconfig from "../../ipconfig";
function renderCategoryItem(itemData, ip, navigate) {
  if (itemData.item.baseUrl) {
    const image = itemData.item.baseUrl;
    const updatedImage = image.replace("localhost", ip); // Replace "localhost" with the IP address
    const itemDataWithoutSeparators = { ...itemData }; // Create a copy of itemData
    delete itemDataWithoutSeparators.separators;
    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => {
            navigate.navigate("SportComplexName", {
              data: itemDataWithoutSeparators,
            });
          }}
        >
          {/* <View style={[styles.innerContainer]}> */}
          <ImageBackground
            source={{ uri: updatedImage }}
            style={styles.imageBackground}
          ></ImageBackground>
          {/* <View> */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {itemData.item.SportName}
          </Text>
          {/* </View> */}
          {/* </View> */}
        </Pressable>
      </View>
    );
  } else {
    const itemDataWithoutSeparators = { ...itemData }; // Create a copy of itemData
    delete itemDataWithoutSeparators.separators;

    return (
      <TouchableOpacity
        onPress={() => {
          navigate.navigate("ComplexDetailsinGeneral", {
            data: itemDataWithoutSeparators,
          });
        }}
      >
        <View style={styles.card}>
          <Image
            style={{
              width: "100%",
              height: 200,
              borderRadius: 5,
            }}
            source={{
              uri: `http://${ip}:9999${itemData.item.picture}`,
            }}
          />
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>{itemData.item.name}</Text>
            <View style={styles.cardHeaderTextDescriptionView}>
              <Text style={styles.cardHeaderTextDescription}>
                {itemData.item.taluka},{itemData.item.district.District}
              </Text>
              {/* <Text style={styles.cardHeaderTextCount}>48 Atheltes</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function FlatListScreen({
  optionField,
  searchfield,
  navigate,
  lat,
  long,
  distance,
  category,
}) {
  //   console.log(lat, long, distance);
  const [complex, setComplex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [range, setRange] = useState(distance);
  const [latitude, setLat] = useState(lat);
  const [longitude, setLong] = useState(long);
  const [cat, setCategory] = useState(category);
  const ip = ipconfig.ip;
  //   useEffect(() => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };
  //     fetch(
  //       `http://${ip}:9999/${optionField}?q=${searchfield}&distance=${distance}&lat=${lat}&lon=${long}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         setComplex(result.data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, [ip, optionField, searchfield, distance, lat, long]);
  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRange("");
    setLat("");
    setLong("");
    setCategory("");
  };

  useEffect(() => {
    setRange(distance);
    setLat(lat);
    setLong(long);
    setCategory(category);
  }, [distance, lat, long, category]);

  //   console.log(range, latitude, longitude);
  const fetchData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://${ip}:9999/${optionField}?q=${searchfield}&distance=${range}&lat=${latitude}&lon=${longitude}&Category=${cat}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setComplex(result.data);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [ip, optionField, searchfield, range, latitude, longitude, cat]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <FlatList
      key={optionField}
      data={complex}
      keyExtractor={(item) => item._id}
      renderItem={(itemData) => renderCategoryItem(itemData, ip, navigate)}
      numColumns={1}
      extraData={{ ip }}
      // extraData={searchfield}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

export default FlatListScreen;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 300,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageBackground: {
    height: "100%",
    flex: 1, // This will make the ImageBackground take up the full parent view
  },
  centeredContainer: {
    flex: 1,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "column",
    marginLeft: "7%",
    marginTop: "2%",
    alignItems: "center",
    padding: 10,
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 3,
    backgroundColor: "white",
    height: 235,

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
    backgroundColor: "#f3f0f0",
    width: "100%",
    height: 40,
    marginTop: -40,
  },
  cardHeaderText: {
    marginTop: "1%",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardHeaderTextDescriptionView: {
    flexDirection: "row",
  },
  cardHeaderTextDescription: {
    flex: 1,
    fontSize: 13,
    fontWeight: "bold",
  },
  cardHeaderTextCount: {
    flex: 1,
  },
});
