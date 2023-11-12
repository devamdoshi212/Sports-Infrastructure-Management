import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
const Home = () => {
  return (
    <FlatList
      data={[
        "Number of Atheltes",
        "Number of Facilities of Instructor",
        "Sport Complex Details",
      ]}
      // keyExtractor={(item) => item._id}
      renderItem={(itemData) => renderCategoryItem(itemData)}
      numColumns={2}
      // extraData={{ ip }}
      // extraData={searchfield}
    />
  );
};

const renderCategoryItem = (itemData) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {
          // navigate.navigate("ComplexDetailsinGeneral", {
          //   data: itemDataWithoutSeparators,
          // });
        }}
      >
        <View style={[styles.innerContainer, { backgroundColor: "gray" }]}>
          <Text style={styles.title}>{itemData.item}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;

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
