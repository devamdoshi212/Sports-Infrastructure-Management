import React, { useState, useCallback, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    Image,
    TouchableOpacity,
    Button,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import ipconfig from "../../ipconfig";

const FilterModal = (props) => {
    const [modalVisible, setModalVisible] = useState(props.show);
    const [selectedItems, setSelectedItems] = useState([]);
    const [distance, setDistance] = useState("");

    const [district, setDistrict] = useState([]);
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

    const onDistanceChanged = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                alert("please enter numbers only");
            }
        }
        setDistance(newText);
    }

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
                        items={district}
                        uniqueKey="_id"
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
                                onChangeText={(value) => {onDistanceChanged(value)}}
                                value={distance}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
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
});

export default FilterModal;
