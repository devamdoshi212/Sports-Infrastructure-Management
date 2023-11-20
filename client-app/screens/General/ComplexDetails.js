import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import ipconfig from "../../ipconfig";
import { Feather } from "@expo/vector-icons";
import FacilityOnClickModal from "./FacilityOnCilckModal";
function renderCategoryItem(itemData, ip, navigation) {
  const itemDataWithoutSeparators = { ...itemData }; // Create a copy of itemData
  delete itemDataWithoutSeparators.separators;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ComplexDetailsinGeneral", {
          data: itemDataWithoutSeparators,
        });
      }}
    >
      <View style={styles.card}>
        <Image
          style={{
            width: 300,
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
              {itemData.item.taluka}
            </Text>
            {/* <Text style={styles.cardHeaderTextCount}>48 Atheltes</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ComplexDetails({ route, navigation }) {
  const [complex, setComplex] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [sportId, setSportId] = useState(null);

  const ip = ipconfig.ip;
  const data = route.params.data;

  const { lat, long, distance, district } = route.params || {};

  const [range, setRange] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLong] = useState("");

  useEffect(() => {
    if (data && data.item && data.item._id) {
      setSportId(data.item._id);
    }
  }, [data]);

  useEffect(() => {
    if (lat) {
      setLat(lat);
      setLong(long);
      setRange(distance);
    }
    if (district) {
      setSearchQuery(district);
    }
  }, [lat, long, distance]);

  useEffect(() => {
    if (sportId) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://${ip}:9999/getComplexFromSport?q=${searchQuery}&sportId=${sportId}&lat=${latitude}&long=${longitude}&distance=${range}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setComplex(result.data);
        })
        .catch((error) => console.log("error", error));
    }
  }, [ip, searchQuery, sportId, latitude, longitude, range]);

  const clearHandler = () => {
    setLat("");
    setLong("");
    setRange("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fbe8e0" }}>
      {filterModal && <FacilityOnClickModal show={filterModal} />}
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
      <Button title="Clear" onPress={clearHandler}></Button>
      <FlatList
        // style={{ marginTop: "20%" }}
        data={complex}
        keyExtractor={(item) => item._id}
        renderItem={(itemData) => renderCategoryItem(itemData, ip, navigation)}
        numColumns={1}
        extraData={{ ip }}
        // extraData={searchfield}
      />
    </View>
  );
}

export default ComplexDetails;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginLeft: "7%",
    marginTop: "2%",
    alignItems: "center",
    padding: 10,
    width: "90%",
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
    backgroundColor: "#fbe8e0",
  },
  cardHeader: {
    flexDirection: "column",
    backgroundColor: "#f3f0f0",
    width: "100%",
    height: 40,
    marginTop: -30,
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    width: "90%",
  },
  searchContainer: {
    flexDirection: "row",
    marginLeft: "7%",
    marginTop: "10%",
    alignItems: "center",
    padding: 10,
    width: "85%",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
  },
});
