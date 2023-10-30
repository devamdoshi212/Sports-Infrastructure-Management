import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

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
          placeholder="Browser"
        >
          <Picker.Item label="Option 1" value="Option 1" />
          <Picker.Item label="Option 2" value="Option 2" />
          <Picker.Item label="Option 3" value="Option 3" />
        </Picker>
      </View>
      {/* Rest of your content */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchButton: {
    marginVertical: 8,
  },
  dropdownPicker: {
    width: 120,
    height: 40,
  },
});

export default Search;
