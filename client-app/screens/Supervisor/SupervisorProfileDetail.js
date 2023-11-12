import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/User";

const SupervisorProfileDetail = ({ navigation }) => {
  const Userdata = useSelector((state) => state.user.User);

  return (
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
            Profile Detail
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                source={require("./../../assets/Supervisor.png")}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name :</Text>
            <Text style={styles.input}>{Userdata.Name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.input}>{Userdata.Email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact No :</Text>
            <Text style={styles.input}>{Userdata.ContactNum}</Text>
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}></View>
          <TouchableOpacity style={styles.actionButton}>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Button title="Edit" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default SupervisorProfileDetail;
