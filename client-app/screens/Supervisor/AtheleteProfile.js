import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ipconfig from "../../ipconfig";
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

const AtheleteProfile = ({ route, navigation }) => {
  const ip = ipconfig.ip;
  const [image, setimage] = useState("./../../assets/icon.png");
  const data = route.params.data;

  useEffect(() => {
    const i = data.athlete[0].baseUrl.slice(1);
    setimage(i);
  }, [image]);
  const navigate = useNavigation();
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Profile</Text>
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
              borderWidth: 5,
            }}
            source={{ uri: `http://${ip}:9999/${image}` }}
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
            {data.user[0].Name}
          </Text>
        </View>
        <View>
          <View style={{ margin: "2%", flexDirection: "row" }}>
            <View style={styles.view}>
              <Text style={styles.profileinfo}>
                {calculateAge(data.user[0].DOB) + " y"}
              </Text>
              <Text>Age</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.profileinfo}>
                {data.athlete[0].height ? data.athlete[0].height + " ft" : "-"}
              </Text>
              <Text>Height</Text>
            </View>
            <View style={styles.view}>
              <Text style={styles.profileinfo}>
                {data.athlete[0].weight ? data.athlete[0].weight + " kg" : "-"}
              </Text>
              <Text>Weight</Text>
            </View>
          </View>
        </View>
        <View style={{ marginRight: "3%", marginTop: "2%" }}>
          <Text style={{ textAlign: "right", fontWeight: "bold" }}>
            Last Updated:{" "}
            {data.athlete[0].updatedAt
              ? convertToIST(data.athlete[0].updatedAt)
              : "-"}
          </Text>
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
                  <Text style={styles.actionTextInfo}>
                    {data.user[0].Email}
                  </Text>
                </View>
                <View></View>
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
                    {data.user[0].ContactNum}
                  </Text>
                </View>
                <View></View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <FontAwesome name="phone" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Emergency Number</Text>
                  <Text style={styles.actionTextInfo}>
                    {data.athlete[0].emergencyNumber}
                  </Text>
                </View>
                <View></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <Fontisto name="blood-drop" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Blood Group</Text>
                  <Text style={styles.actionTextInfo}>
                    {data.athlete[0].bloodGroup}
                  </Text>
                </View>
                <View></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <MaterialIcons name="location-city" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Address</Text>
                  <Text style={styles.actionTextInfo}>
                    {data.athlete[0].address}
                  </Text>
                </View>
                <View></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <MaterialCommunityIcons name="human-male-height" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Height</Text>
                  <Text style={styles.actionTextInfo}>
                    {data.athlete[0].height
                      ? data.athlete[0].height + " ft"
                      : "-"}
                  </Text>
                </View>
                <View></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.row}>
                <View style={{ borderRadius: 15, width: "15%" }}>
                  <FontAwesome5 name="weight" size={30} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.actionText}>Weight</Text>
                  <Text style={styles.actionTextInfo}>
                    {data.athlete[0].weight
                      ? data.athlete[0].weight + " kg"
                      : "-"}
                  </Text>
                </View>
                <View></View>
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

export default AtheleteProfile;
