import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Alert,
  Text,
  TextInput,
} from "react-native";
import { Rating } from "react-native-ratings";
import ipconfig from "../../ipconfig";
const RatingModal = (props) => {
  const ip = ipconfig.ip;
  const [modalVisible, setModalVisible] = useState(props.rateModal);
  const [rating, setRating] = useState(1);
  const [remarks, setremarks] = useState("");
  const ratinghandler = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/addRating?athleteId=${props.athelteid}&sportId=${props.sportid}&sportsComplexId=${props.sportcomplex}&rating=${rating}&remarks=${remarks}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        alert("Done");
        setModalVisible(!modalVisible);
      })
      .catch((error) => console.log("error", error));
  };
  function ratingCompleted(rating) {
    setRating(rating);
    props.setrating(rating);
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
        <View style={styles.card}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            showRating
            onFinishRating={ratingCompleted}
            startingValue={rating}
            minValue={1}
          />

          <View style={styles.loginBox}>
            <Text style={styles.title}>Remarks</Text>
            <TextInput
              style={styles.input}
              placeholder="Remarks"
              onChangeText={(e) => {
                setremarks(e);
              }}
              value={remarks}
            />
          </View>
          <TouchableOpacity style={{ width: "50%", alignSelf: "center" }}>
            <View
              style={{
                marginTop: "21%",
                marginBottom: "10%",
                width: "58%",
                alignSelf: "center",
              }}
            >
              <Button title="rating" onPress={ratinghandler} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
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
    width: "80%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    color: "black",
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "white",
  },
});

export default RatingModal;
