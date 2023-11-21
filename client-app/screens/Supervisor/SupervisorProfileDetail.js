import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import ipconfig from "../../ipconfig";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Supervisorimage from "./../../assets/Supervisor.png";
function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If the birthdate for the current year hasn't occurred yet, subtract one year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
function convertToIST(utcTimeString) {
  const utcTime = new Date(utcTimeString);

  const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds

  const istTime = new Date(utcTime.getTime() + istOffset);

  const istTimeString = istTime
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  return istTimeString;
}

const SupervisorProfileDetail = ({ navigation }) => {
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const [image, setimage] = useState("./../../assets/icon.png");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View>
            <Ionicons name="arrow-back" size={24} />
          </View>
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>My Profile</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.profileImage}>
          <Image
            style={{
              width: 125,
              height: 125,
              borderRadius: 50,
              marginLeft: 1,
              borderColor: "#fbe8e0",
              backgroundColor: "white",
              borderWidth: 5,
            }}
            source={Supervisorimage}
          />
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              alignSelf: "center",
              marginTop: "1%",
            }}
          >
            {Userdata.Name}
          </Text>
        </View>
        <View>
          <View style={{ margin: "2%", flexDirection: "row" }}>
            <View style={styles.view}>
              <Text style={styles.profileinfo}>
                {calculateAge(Userdata.DOB) + " y"}
              </Text>
              <Text>Age</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <ScrollView style={{ marginBottom: 20 }}>
          <View style={styles.colomn}>
            <View>
              <Text style={styles.cardHeaderText}>Personal Details</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <Entypo name="email" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Email</Text>
                  <Text style={styles.actionTextInfo}>{Userdata.Email}</Text>
                </View>
                <View>
                  {/* <Feather
                      style={{ marginTop: "10%", marginLeft: 10 }}
                      name="edit-3"
                      size={20}
                    /> */}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <FontAwesome name="phone" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Mobile Number</Text>
                  <Text style={styles.actionTextInfo}>
                    {Userdata.ContactNum}
                  </Text>
                </View>
                <View>
                  {/* <Feather
                      style={{ marginTop: "10%", marginLeft: 10 }}
                      name="edit-3"
                      size={20}
                    /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    padding: 5,
  },
  header: {
    margin: 20,
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  card: {
    borderColor: "#9cafa2",
    borderRadius: 20,
    borderWidth: 0.7,
    borderBottomWidth: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    marginTop: "10%",
    marginLeft: "2.5%",
    paddingBottom: "2%",
    width: "95%",
    backgroundColor: "#9cafa2",
    // #d7a592
    // #c99c81
    // #e3cfbf
    // #c99c81
  },
  profileImage: {
    alignSelf: "center",
    marginHorizontal: "10%",
    marginTop: -50,
  },
  view: {
    flex: 1,
    alignItems: "center",
    marginTop: "2%",
  },
  profileinfo: {
    fontWeight: "800",
    fontSize: 16,
  },
  actions: {
    marginTop: "3%",
    width: "96%",
    height: "60%",
    alignSelf: "center",
    borderRadius: 15,
  },
  colomn: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    flexDirection: "column",
    fontColor: "white",
    marginTop: "2%",
    backgroundColor: "#e8b7a9",
  },
  cardHeaderText: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: "5%",
  },
  row: {
    flexDirection: "row",
    marginBottom: "2%",
  },
  rowText: {
    width: "75%",
    marginTop: "-2%",
    marginLeft: "3%",
    marginBottom: "2%",
  },
  actionText: {
    alignSelf: "flex-start",
    width: "80%",
    fontSize: 16,
  },
  actionTextInfo: {
    alignSelf: "flex-start",
    width: "80%",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SupervisorProfileDetail;
