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
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
const SportComplexDetail = () => {
  const navigate = useNavigation();
  const ip = ipconfig.ip;
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const complexId = Atheltedata[0].createdBy.SportComplexId;
  const [details, setDetails] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/getSportsComplex?_id=${complexId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDetails(result.data[0]);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigate.goBack();
            }}
          >
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Sport Complex Details
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#f0f0f0" : "white",
                  padding: 20,
                  borderRadius: 10,
                },
              ]}
            >
              {/* <View style={styles.card}> */}
              <View style={styles.row}>
                <Text style={styles.label}>Sport Complex Name: </Text>
                <Text style={styles.input}>{details.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.input}>{details.location}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Taluka:</Text>
                <Text style={styles.input}>{details.taluka}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Since :</Text>
                <Text style={styles.input}>{details.operationalSince}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Area :</Text>
                <Text style={styles.input}>{details.area}</Text>
              </View>
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

export default SportComplexDetail;
