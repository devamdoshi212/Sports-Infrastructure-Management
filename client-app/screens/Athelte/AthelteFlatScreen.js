import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import ipconfig from "../../ipconfig";
function renderCategoryItem(itemData, ip, navigation) {
  const itemDataWithoutSeparators = { ...itemData }; // Create a copy of itemData
  delete itemDataWithoutSeparators.separators;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ComplexFullDetailsinAthelte", {
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

function AthelteFlatListScreen({ route, navigation }) {
  const [complex, setComplex] = useState([]);
  const ip = ipconfig.ip;
  const data = route.params.data;
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getComplexFromSport?sportId=${data.item._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setComplex(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [ip]);

  return (
    <View style={{ marginTop: "20%" }}>
      <FlatList
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

export default AthelteFlatListScreen;

const styles = StyleSheet.create({
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
    alignItems: "center",
  },
});
