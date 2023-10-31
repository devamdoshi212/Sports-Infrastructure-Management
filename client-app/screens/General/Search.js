import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FlatListScreen from "./FlatListScreen";

const Search = () => {
  const [isSearchVisible, setSearchVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Browser");

  const handleSearch = () => {
    // Handle search logic here
    console.log("Search query:", searchQuery);
    // You can reset the search query and hide the search bar after performing the search
    setSearchQuery("");
  };

  const handleDropdownChange = (itemValue) => {
    // Handle dropdown selection logic here
    setSelectedOption(itemValue);
  };

  return (
    <View
      style={{
        marginTop: 60,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          {isSearchVisible ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <FontAwesome name="search" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setSearchVisible(true)}
            >
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
          )}
          <Picker
            style={styles.dropdownPicker}
            selectedValue={selectedOption}
            onValueChange={handleDropdownChange}
          >
            <Picker.Item label="Facilities" value="getSports" />
            <Picker.Item label="Sports Complex" value="getSportsComplex" />
          </Picker>
        </View>
      </View>
      <FlatListScreen />
    </View>
    //
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 4, // 80% width
    height: 40,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 8, // Add some margin to separate it from the search button
  },
  searchButton: {
    flex: 1, // 20% width
    marginVertical: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownPicker: {
    flex: 1,
    width: 120,
    height: 40,
    borderColor: "lightgray",
  },
});

export default Search;
