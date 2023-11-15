import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import ipconfig from "../../ipconfig";
import { useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
const FilterModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.show);
  const [selectedItems, setSelectedItems] = useState([]);
  const [distance, setDistance] = useState("");
  const [district, setDistrict] = useState([]);
  const [location, setLocation] = useState({});
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/getDistrict`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDistrict(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const onSelectedItemsChange = (selectedItem) => {
    // if (selectedItem.length == 1) {
    //     selectedItem = null;
    // }
    setSelectedItems(selectedItem);
  };
  console.log(selectedItems);
  const items = [
    {
      id: "1",
      category: "Indoor",
    },
    {
      id: "2",
      category: "Outdoor",
    },
  ];

  const onDistanceChanged = (text) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("please enter numbers only");
      }
    }
    setDistance(newText);
  };

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    if (!location) {
      return (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    } else {
      // Check if location is available
      if (
        location.coords &&
        location.coords.latitude &&
        location.coords.longitude
      ) {
        setLocation(location);
        navigation.navigate("Search", {
          lat: location.coords.latitude,
          long: location.coords.longitude,
          distance: distance,
          district: selectedItems[0],
        });
        setModalVisible(!modalVisible);
      } else {
        // Handle the case when location is not available
        alert("Location not available");
      }
    }
  }
  if (props.selectedOption === "searchSportsComplex") {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              marginTop: "7%",
              flexDirection: "row",
              alignContent: "center",
              alignSelf: "center",
              width: "90%",
            }}
          >
            <View style={styles.back}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "grey" : null,
                    padding: "2%",
                    borderRadius: 10,
                  },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            </View>
            <View
              style={{
                alignContent: "center",
                alignSelf: "center",
                marginLeft: "65%",
              }}
            >
              <Pressable
                onPress={() => {
                  alert("done successfully");
                  getLocationHandler();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    // fontcolor: "blue"
                  }}
                >
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.card}>
            <MultiSelect
              maximumSelectionLength={5}
              // hideTags
              items={district}
              uniqueKey="District"
              // ref={(component) => { MultiSelect = component }}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Select District"
              searchInputPlaceholderText="Search District"
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#000000"
              tagBorderColor="#000000"
              tagTextColor="#000000"
              selectedItemTextColor="#000000"
              selectedItemIconColor="#000000"
              itemTextColor="#CCC"
              displayKey="District"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#000000"
              submitButtonText="Submit"
              removeSelected
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", marginTop: "5%" }}>
                Max Distance of SportComplex:
              </Text>
              <View
                style={{
                  marginLeft: "5%",
                  marginTop: "3.5%",
                  height: 30,
                  width: 30,
                  alignSelf: "center",
                }}
              >
                <TextInput
                  placeholder={"0"}
                  keyboardType={"numeric"}
                  onChangeText={(value) => {
                    onDistanceChanged(value);
                  }}
                  value={distance}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              marginTop: "7%",
              flexDirection: "row",
              alignContent: "center",
              alignSelf: "center",
              width: "90%",
            }}
          >
            <View style={styles.back}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "grey" : null,
                    padding: "2%",
                    borderRadius: 10,
                  },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons name="arrow-back" size={24} />
              </Pressable>
            </View>
            <View
              style={{
                alignContent: "center",
                alignSelf: "center",
                marginLeft: "65%",
              }}
            >
              <Pressable
                onPress={() => {
                  alert("done successfully");
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    // fontcolor: "blue"
                  }}
                >
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.card}>
            <MultiSelect
              maximumSelectionLength={5}
              // hideTags
              items={items}
              uniqueKey="_id"
              // ref={(component) => { MultiSelect = component }}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Select category"
              searchInputPlaceholderText="Search category"
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#000000"
              tagBorderColor="#000000"
              tagTextColor="#000000"
              selectedItemTextColor="#000000"
              selectedItemIconColor="#000000"
              itemTextColor="#CCC"
              displayKey="category"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#000000"
              submitButtonText="Submit"
              removeSelected
            />
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  back: {
    marginLeft: "4%",
  },
  column1: {
    width: "60%",
  },
  column2: {
    width: "45%",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: "1.5%",
    marginVertical: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    padding: 5,
  },
  input: {
    marginLeft: 6,
  },
  actions: {
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilterModal;
