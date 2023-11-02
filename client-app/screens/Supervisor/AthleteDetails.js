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
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "./ModalView";
import { useNavigation } from "@react-navigation/native";
const AthleteDetails = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigation();
  return (
    <>
      {show && <Modal />}
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
              Students Detail
            </Text>
          </View>
          <View style={styles.info}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "grey" : null,
                },
              ]}
              onPress={() => {
                setShow(!show);
              }}
            >
              <Feather name="info" size={24} />
            </Pressable>
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
              onPress={() => {
                navigate.navigate("AthleteProfile");
              }}
            >
              <View style={styles.StudentsDetail}>
                <View style={styles.leftColumn}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      marginLeft: 1,
                    }}
                    source={require("./../../assets/icon.png")}
                  />
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.name}>Devam</Text>
                  <Text style={styles.name}>Cricket</Text>
                </View>
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
  info: {
    paddingRight: 50,
    marginHorizontal: 30,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginLeft: "6%",
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
  },
  StudentsDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 2,
    paddingLeft: 50,
    paddingBottom: 8,
    marginLeft: 6,
  },
  name: {
    fontSize: 16,
    color: "black",
    marginTop: 15,
  },
  back: {
    marginHorizontal: 30,
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

export default AthleteDetails;
