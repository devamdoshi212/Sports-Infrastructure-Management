import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ModalView = (props) => {
  const [modalVisible, setModalVisible] = useState(props.show);
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
        <View style={styles.back}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "grey" : null,
                padding: 20,
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
        <View style={styles.card}>
          <View style={styles.profileDetail}>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.label}>Sport Name</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.label}>Total Enroll Student</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.label}>Cricket</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.input}>15</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.label}>Volleyball</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.input}>25</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.label}>Chess</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.input}>5</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <View style={{ width: "50%", alignSelf: "center" }}>
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </TouchableOpacity>
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
    marginTop: "10%",
    marginLeft: "4%",
    // borderWidth: 1,
    marginRight: "80%",
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
    marginHorizontal: 30,
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

export default ModalView;
