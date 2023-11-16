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
import RatingModal from "./RatingModal";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const AthelteDailyResponse = () => {
  const Userdata = useSelector((state) => state.user.User);
  // console.log(Atheltedata[0].payments[0].sports);
  //   const id = Atheltedata[0]._id;
  const [rateModal, setRateModal] = useState(false);
  const [rateId, setRateId] = useState("");
  const [rating, setrating] = useState("");
  const ip = ipconfig.ip;
  const [data, setData] = useState([]);
  const [refresh, setrefersh] = useState(false);
  const refreshHandler = () => {
    setrefersh(!refresh);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // console.log(Userdata._id);
    fetch(
      `http://${ip}:9999/ratingForInstructor?instructorId=${Userdata._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.ratings);
      })
      .catch((error) => console.log("error", error));
  }, [refresh]);

  const ratingcountHandler = (id) => {
    setrating(id);
  };
  const ratingHandler = (id) => {
    console.log(id);
    setRateModal(!rateModal);
    setRateId(id);
  };
  const navigate = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigate.goBack();
            }}
          >
            {rateModal && (
              <RatingModal
                rateID={rateId}
                setrating={ratingcountHandler}
                rateModal={rateModal}
                refreshHandler={refreshHandler}
              ></RatingModal>
            )}
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Athelte Daily Response
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map((item, index) => (
            <View style={styles.card} key={index}>
              <Pressable
                onPress={() => {
                  // setRateId(item._id);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#f0f0f0" : "white",
                    padding: 20,
                    borderRadius: 10,
                  },
                ]}
              >
                <View style={styles.row}>
                  <Text style={styles.label}>Name : </Text>
                  <Text style={styles.input}>{item.athleteId.userId.Name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Remarks : </Text>
                  <Text style={styles.input}>{item.remarks}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Sport : </Text>
                  <Text style={styles.input}>{item.sport.SportName}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Parameter : </Text>
                </View>

                {item.parameters.map((item, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.label}>{item.parameter}</Text>
                    <Text style={styles.input}>{item.value}</Text>
                  </View>
                ))}

                <View style={styles.row}>
                  <Text style={styles.label}>Date : </Text>
                  <Text style={styles.input}>
                    {item.createdAt.split("T")[0]}
                  </Text>
                </View>
                <Pressable onPress={ratingHandler.bind(this, item._id)}>
                  <View style={{ alignSelf: "flex-end", padding: 10 }}>
                    <Text style={{ color: "#0054a8" }}>Rate us</Text>
                  </View>
                </Pressable>
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
    alignItems: "center",
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

export default AthelteDailyResponse;
