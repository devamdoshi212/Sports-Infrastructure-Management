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
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const ListComplaint = () => {
  const navigation = useNavigation();
  const [selectedstatus, setselectedstatus] = useState("0");
  const [Complaint, setcomplain] = useState([]);
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const sid = Userdata.SportComplexId;
  const [refresh, setrefresh] = useState(false);
  const refreshhandler = () => {
    setrefresh(!refresh);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://${ip}:9999/getAllComplaints?userId=${Userdata._id}&status=${selectedstatus}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setcomplain(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [selectedstatus, refresh]);
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
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Complaint List
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AthelteComplaint");
          }}
        >
          <View style={styles.row}>
            <Text style={styles.actionText}>Raise Complaint</Text>
            <MaterialIcons name="navigate-next" size={24} />
          </View>
        </TouchableOpacity>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedstatus}
            onValueChange={(itemValue, itemIndex) => {
              setselectedstatus(itemValue);
              //   handleInput("bloodGroup", itemValue);
            }}
            style={styles.input}
            placeholder="Select Complaint Status"
          >
            {/* <Picker.Item label={"Select a Blood Group"} /> */}
            <Picker.Item label="Pending" value="0" />
            <Picker.Item label="Solved" value="1" />
          </Picker>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Complaint.map((item, index) => (
            <View style={styles.card} key={index}>
              <Pressable
                onPress={() => {
                  navigate.navigate("ComplaintView", {
                    data: item,
                    refreshhandler: refreshhandler,
                  });
                }}
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
                  <View style={styles.column1}>
                    <Text style={styles.label}>{item.userId.Name}</Text>
                  </View>
                  <View style={styles.column2}>
                    <Text style={styles.input}>Type</Text>
                    <Text style={styles.input}>{item.type.Type}</Text>
                  </View>
                  <View style={styles.column3}>
                    <Entypo style={{ color: "#0054a8" }} name="eye" size={24} />
                  </View>
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
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
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
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  column1: {
    width: "60%",
  },
  column2: {
    width: "30%",
  },
  column3: {
    marginLeft: "10%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    marginLeft: 6,
    textAlign: "center",
  },
  actionText: {
    width: "75%",
    fontWeight: "bold",
    fontSize: 15,
  },
  row: {
    width: "120%",
    marginTop: "5%",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: "3%",
  },
});

export default ListComplaint;
