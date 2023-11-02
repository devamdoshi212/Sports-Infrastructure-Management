import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ipconfig from "../../ipconfig";
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Your Profile</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.photo}>
          <View style={{ flexDirection: "row", padding: 20 }}>
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginHorizontal: 15,
              }}
              source={{ uri: `http://${ip}:9999/${image}` }}
            />
          </View>
        </View>
        <View style={styles.profileDetail}>
          <View style={styles.row}>
            <Text style={styles.label}>Name :</Text>
            <Text style={styles.input}>{data.user[0].Name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.input}>{data.user[0].Email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact No :</Text>
            <Text style={styles.input}>{data.user[0].ContactNum}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Blood Group :</Text>
            <Text style={styles.input}>{data.athlete[0].bloodGroup}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.input}>{data.athlete[0].address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Emergency No :</Text>
            <Text style={styles.input}>{data.athlete[0].emergencyNumber}</Text>
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}>
            {/* <Image
                style={{ width: 120, height: 120 }}
                source={require("../assets/icon.png")}
              /> */}
          </View>
          <TouchableOpacity style={styles.actionButton}>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Button title="Edit" />
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

export default AtheleteProfile;
