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
const GeneralComplexDetailsScreen = ({ navigation, route }) => {
  const { data } = route.params;
  // console.log(data);
  console.log(data.item.sports);
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
            <Text style={styles.input}>{data.item.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Area :</Text>
            <Text style={styles.input}>{data.item.area}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location :</Text>
            <Text style={styles.input}>{data.item.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Since :</Text>
            <Text style={styles.input}>{data.item.operationalSince}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Available Sports :</Text>
          </View>
          {/* <View>
            {data.item.sports.map((item, index) => (
              <Text style={styles.input} key={index}>
                {item._id}
              </Text>
            ))}
          </View> */}
          <View style={styles.row}>
            <Text style={styles.label}>Total number of Instructor :</Text>
            <Text style={styles.input}>7</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total number of Enroll Student :</Text>
            <Text style={styles.input}>7</Text>
          </View>
          <View style={{ alignSelf: "center", marginTop: 10 }}></View>
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

export default GeneralComplexDetailsScreen;
