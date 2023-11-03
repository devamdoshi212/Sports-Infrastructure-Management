import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Rating } from "react-native-ratings";
const RatingModal = (props) => {
  const [modalVisible, setModalVisible] = useState(props.rateModal);
  const [rating, setRating] = useState(1);
  function ratingCompleted(rating) {
    setRating(rating);
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
          <TouchableOpacity style={{ width: "50%", alignSelf: "center" }}>
            <View
              style={{
                marginTop: "21%",
                marginBottom: "10%",
                width: "58%",
                alignSelf: "center",
              }}
            >
              <Button
                title="rating"
                onPress={() => {
                  console.log(rating);
                  setModalVisible(false);
                }}
              />
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
});

export default RatingModal;
