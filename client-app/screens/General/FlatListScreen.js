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
function renderCategoryItem(itemData, ip) {
  if (itemData.item.baseUrl) {
    const image = itemData.item.baseUrl;
    const updatedImage = image.replace("localhost", ip); // Replace "localhost" with the IP address

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
          {/* <View style={[styles.innerContainer, { backgroundColor: "gray" }]}> */}
          <ImageBackground
            source={{ uri: updatedImage }}
            style={styles.imageBackground}
          ></ImageBackground>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {itemData.item.SportName}
            </Text>
          </View>
          {/* </View> */}
        </Pressable>
      </View>
    );
  } else {
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
}

function FlatListScreen({ navigation, optionField, searchfield }) {
  const [complex, setComplex] = useState([]);
  const ip = ipconfig.ip;
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/${optionField}?q=${searchfield}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setComplex(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [ip, optionField, searchfield]);

  return (
    <FlatList
      data={complex}
      keyExtractor={(item) => item._id}
      renderItem={(itemData) => renderCategoryItem(itemData, ip)}
      numColumns={2}
      extraData={ip}
      // extraData={searchfield}
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
