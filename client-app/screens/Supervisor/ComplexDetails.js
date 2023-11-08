import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ipconfig from "../../ipconfig";
import { useState } from "react";

const ComplexDetails = ({ navigation }) => {
  const Userdata = useSelector((state) => state.user.User);
  const complexId = Userdata.SportComplexId;
  console.log(complexId);
  const ip = ipconfig.ip;
  const [details, setDetails] = useState({});
  const [detailsInstructor, setDetailsInstrutor] = useState({});
  const [visible, setvisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("https://maps.app.goo.gl/QMpF8LiY8ohdbdNGA");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/sportsComplexDetail?sportsComplex=${complexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDetailsInstrutor(result);
        setLoading(true);
      });

    fetch(`http://${ip}:9999/getSportsComplex?_id=${complexId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDetails(result.data[0]);
        setvisible(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const openGoogleMaps = () => {
    const mapUrl = details.location; // Replace with the actual latitude and longitude or address you want to open

    Linking.openURL(mapUrl).catch((err) =>
      console.error("An error occurred: ", err)
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Pressable
          onPress={() => {
            navigation.navigate("SupervisorProfile");
          }}
        >
          <View style={styles.back}>
            <Ionicons name="arrow-back" size={24} />
          </View>
        </Pressable> */}
        <View style={styles.heading}>
          <Text
            style={{ fontWeight: "bold", fontSize: 25, textAlign: "center" }}
          >
            Your Complex
          </Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.ComplexDetail}>
          <View style={styles.row}>
            <Text style={styles.label}>Complex Name :</Text>
            <Text style={styles.input}>{visible && details.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.input}>{Userdata.Email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact No :</Text>
            <Text style={styles.input}>{Userdata.ContactNum}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.input}>Krishna bungalows, Gandhinagar</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Since :</Text>
            <Text style={styles.input}>
              {visible && details.operationalSince}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Available Sports :</Text>
          </View>
          <View>
            {loading &&
              detailsInstructor.availableSports.map((item, index) => (
                <Text style={styles.input} key={index}>
                  {item}
                </Text>
              ))}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total number of Instructor :</Text>
            <Text style={styles.input}>
              {loading && detailsInstructor.instructerData.length}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total number of Enroll Student :</Text>
            <Text style={styles.input}>
              {loading && detailsInstructor.athleteCount}
            </Text>
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}></View>
          <TouchableOpacity style={styles.actionButton}>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Button title="View in Map" onPress={openGoogleMaps} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 25,
  },
  photo: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginTop: 50,
    marginBottom: 60,
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
  },
  header: {
    margin: 20,
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
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
    marginBottom: 15,
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

export default ComplexDetails;
