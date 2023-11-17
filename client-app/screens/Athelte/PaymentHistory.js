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
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const PaymentHistory = ({ navigation }) => {
  const ip = ipconfig.ip;
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const [show, setShow] = useState(false);
  const [payments, setpayments] = useState([]);
  const [data, setdata] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/paymentHistoryAthlete?athleteId=${Atheltedata[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setpayments(result.payments);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const showHandler = (item) => {
    // console.log(item);
    setdata(item);
    setShow(!show);
  };
  return (
    <>
      <View>
        {show && (
          <Modal show={show} data={data} navigation={navigation}></Modal>
        )}
      </View>
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
          {payments &&
            payments.map((item, index) => (
              <View style={styles.card} key={index}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#f8d7c9" : "#f2b69c",

                      padding: 20,
                      borderRadius: 10,
                    },
                    // styles.wrapperCustom
                  ]}
                  onPress={showHandler.bind(this, item)}
                >
                  {/* <View style={styles.card}> */}
                  <View style={styles.row}>
                    <Text style={styles.label}>Amount :</Text>
                    <Text style={styles.input}>{item.amount}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Sport:</Text>
                    <Text style={styles.input}>{item.sportName}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>From :</Text>
                    <Text style={styles.input}>{item.from}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>To :</Text>
                    <Text style={styles.input}>{item.to}</Text>
                  </View>
                  <View style={{ alignSelf: "flex-end" }}>
                    <Entypo style={{ color: "#0054a8" }} name="eye" size={24} />
                  </View>
                </Pressable>
              </View>
            ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: "#fbe8e0",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#fbe8e0",
    alignItems: "center",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
    marginLeft: "10%",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
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
