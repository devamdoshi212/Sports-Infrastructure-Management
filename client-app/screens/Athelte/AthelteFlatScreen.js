import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ImageBackground,
} from "react-native";
import ipconfig from "../../ipconfig";
function renderCategoryItem(itemData, ip, navigation) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {
          navigation.navigate("ComplexFullDetailsinAthelte", {
            data: itemData,
          });
        }}
      >
        <View style={[styles.innerContainer, { backgroundColor: "gray" }]}>
          <Text style={styles.title}>{itemData.item.name}</Text>
        </View>
      </Pressable>
    </View>
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
        numColumns={2}
        extraData={{ ip }}
        // extraData={searchfield}
      />
    </View>
  );
}

export default AthelteFlatListScreen;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
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
    flex: 1, // This will make the ImageBackground take up the full parent view
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
