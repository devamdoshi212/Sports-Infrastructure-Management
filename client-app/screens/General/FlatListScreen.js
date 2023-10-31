import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";

function renderCategoryItem(itemData) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        // onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: "gray" }]}>
          <Text style={styles.title}>{itemData.item.name}</Text>
        </View>
      </Pressable>
    </View>
  );
}

function FlatListScreen({ navigation }) {
  const [complex, setComplex] = useState([]);
  const ip = useSelector((state) => state.network.ipaddress);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/getSportsComplex`, requestOptions)
      .then((response) => response.json())
      .then((result) => setComplex(result.data))
      .catch((error) => console.log("error", error));
  }, [ip]);

  return (
    <FlatList
      data={complex}
      keyExtractor={(item) => item._id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default FlatListScreen;

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
    fontSize: 18,
  },
});
