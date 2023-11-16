import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ipconfig from "../../ipconfig";

const SatisfactionToast = ({ isVisible, onClose, onSatisfaction }) => {
  if (!isVisible) {
    return null;
  }

  const handleCancel = () => {
    onClose();
  };

  const handleSatisfaction = () => {
    onSatisfaction();
    onClose();
  };

  return (
    <View style={styles.toastContainer}>
      <Text>Are you satisfied?</Text>
      <TouchableOpacity onPress={handleCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSatisfaction}>
        <Text>Yes, I'm satisfied</Text>
      </TouchableOpacity>
    </View>
  );
};

const SatisfiedResponse = (props) => {
  const ip = ipconfig.ip;
  const [isToastVisible, setToastVisible] = useState(true);

  const showSatisfactionToast = () => {
    setToastVisible(true);
  };

  const closeSatisfactionToast = () => {
    setToastVisible(false);
  };

  const handleSatisfaction = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      satisfied: 1,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/updateComplaintAthleteResponse/${props.cid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("satisfied entry done");
        props.refreshhandler();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <TouchableOpacity onPress={showSatisfactionToast}>
        <Text>Show Satisfaction Toast</Text>
      </TouchableOpacity> */}
      <SatisfactionToast
        isVisible={isToastVisible}
        onClose={closeSatisfactionToast}
        onSatisfaction={handleSatisfaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    // position: "absolute",
    marginTop: 10,
    // bottom: 50,
    // left: 20,
    // right: 20,
    // zIndex: 999,
  },
});

export default SatisfiedResponse;
