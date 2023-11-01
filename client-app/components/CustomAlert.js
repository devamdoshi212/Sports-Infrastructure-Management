import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const CustomAlert = ({ isVisible, onClose, message }) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
