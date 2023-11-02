import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ipconfig from "../../ipconfig";

const PaymentHistory = ({ navigation }) => {
  const ip = ipconfig.ip;
  const [show, setShow] = useState(false);
  const [payments, setpayments] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getPaymentDetailswithsportwithinstructor?athleteId=6542381bcb90e13d13f4f28b`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setpayments(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const showHandler = () => {
    setShow(!show);
  };
  return (
    <>
      <View>{show && <Modal show={show} navigation={navigation}></Modal>}</View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Payment History
            </Text>
          </View>
        </View>
        {/* {show && <Modal} */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#f0f0f0" : "white",
                  padding: 20,
                  borderRadius: 10,
                },
                // styles.wrapperCustom
              ]}
              onPress={showHandler}
            >
              {/* <View style={styles.card}> */}
              <View style={styles.row}>
                <Text style={styles.label}>Amount :</Text>
                <Text style={styles.input}>1000</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Sport:</Text>
                <Text style={styles.input}>abc@gmail.com</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>From :</Text>
                <Text style={styles.input}>12/34/5678</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>To :</Text>
                <Text style={styles.input}>12/34/5678</Text>
              </View>
              {/* </View> */}
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 50,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    justifyContent:"center",
    alignItems:"center"
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    marginLeft: 6,
  },
});

export default PaymentHistory;
