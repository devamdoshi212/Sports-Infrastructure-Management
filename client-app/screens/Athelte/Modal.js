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
import { useNavigation } from "@react-navigation/native";
const ModalView = (props) => {
  const [modalVisible, setModalVisible] = useState(props.show);
  const navigate = useNavigation();
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
        {/* <Pressable
          onPress={() => {
            // props.navigation.goBack();
            navigate.goBack();
          }}
        > */}
          {/* <View style={styles.back}>
            <Ionicons name="arrow-back" size={24} />
          </View>
        </Pressable> */}
        <View style={styles.card}>
          <View style={styles.profileDetail}>
            <View style={styles.row}>
              <Text style={styles.label}>Name :</Text>
              <Text style={styles.input}>{props.data.athleteName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Amount :</Text>
              <Text style={styles.input}>{props.data.amount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sport :</Text>
              <Text style={styles.input}>{props.data.sportName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Complex_Name :</Text>
              <Text style={styles.input}>{props.data.sportComplexName}</Text>

            </View>
            <View style={styles.row}>
              <Text style={styles.label}>From :</Text>
              <Text style={styles.input}>{props.data.from}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>To :</Text>
              <Text style={styles.input}>{props.data.to}</Text>
            </View>

            <TouchableOpacity style={styles.actionButton}>
              <View style={{ width: "50%", alignSelf: "center" }}>
                <Button title="Print" />
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent:"center"
  },
  back: {
    marginTop: "10%",
    marginLeft: "1%",
    marginLeft: 2,
  },
  photo: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 50,
    marginBottom: 60,
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
    width:"90%",
    alignSelf:"center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 5,
  },
  input: {
    marginLeft: 6,
    width:"60%"
  },
  actions: {
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
});

export default ModalView;
