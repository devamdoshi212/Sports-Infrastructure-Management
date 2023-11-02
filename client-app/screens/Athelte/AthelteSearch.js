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
import FlatListAthelte from "./FlatListAthelte";

const AthelteSearch = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("getSports");

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
  console.log(selectedOption);

  return (
    <View
      style={{
        marginTop: 60,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>

          <Picker
            style={styles.dropdownPicker}
            selectedValue={selectedOption}
            onValueChange={handleDropdownChange}
          >
            <Picker.Item label="Facilities" value="getSports" />
            <Picker.Item label="Sports Complex" value="searchSportsComplex" />
          </Picker>
        </View>
      </View>
      <FlatListAthelte
        optionField={selectedOption}
        searchfield={searchQuery}
        navigate={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: "5%",
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
    padding: 10,
    marginLeft: "-8%",
  },
  input: {
    flex: 4,
    height: 40,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  dropdownPicker: {
    flex: 1,
    height: 40,
    borderColor: "lightgray",
  },
});

export default AthelteSearch;
