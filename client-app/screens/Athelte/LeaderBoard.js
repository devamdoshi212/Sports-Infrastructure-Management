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
import ipconfig from "../../ipconfig";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
const ip = ipconfig.ip;
const LeaderBoard = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/ratingForAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.ratings);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
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
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Ranking</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map((item, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.row}>
                <View style={styles.column1}>
                  <Text style={styles.label}>{item.athleteId.userId.Name}</Text>
                </View>
                <View style={styles.column2}>
                  <Text style={styles.label}>{item.rating}</Text>
                </View>
              </View>
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
    backgroundColor: "white",
    paddingVertical: 50,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    paddingLeft: "5%",
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
    marginVertical: 5,
    // paddingVertical:5
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    width: "90%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "1%",
    paddingVertical: "5%",
  },
  column1: {
    // width: "60%",
    paddingLeft: "5%",
  },
  column2: {
    // width: "50%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    marginLeft: 6,
    textAlign: "center",
    // marginLeft: "45%",
  },
});

export default LeaderBoard;
