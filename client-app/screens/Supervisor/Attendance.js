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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const Attendance = ({ navigation }) => {
  const Userdata = useSelector((s) => s.user.User);
  const ip = ipconfig.ip;
  const [attendance, setattendance] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://${ip}:9999/getSession?sportscomplex=${Userdata.SportComplexId}&date=${date}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) setattendance(result.data[0].enrolls);
        else setattendance([]);
      })
      .catch((error) => console.log("error", error));
  }, [date]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
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
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Attendance</Text>
          </View>
        </View>
        <View
          style={{
            width: "93%",
            paddingLeft: "7%",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-around",
          }}
        >
          <Text
            style={{
              width: "80%",
              borderRadius: 2,
              backgroundColor: "white",
              paddingBottom: "5%",
              textAlign: "center",
              paddingTop: "4%",
            }}
          >
            {date.toUTCString()}
          </Text>
          <Button onPress={showDatepicker} title="Date" />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text style={styles.label}>Name</Text>
              </View>
              <View style={styles.column2}>
                <Text style={styles.label}>In Time</Text>
              </View>
              <View style={styles.column3}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {" "}
                  Out Time
                </Text>
              </View>
            </View>
          </View>
          {attendance.map((item, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.row}>
                <View style={styles.column1}>
                  <Text style={styles.label}>{item.userId.Name}</Text>
                </View>
                <View style={styles.column2}>
                  <Text style={styles.label}>
                    {new Date(item.entry).toUTCString().substring(17, 29)}
                  </Text>
                </View>
                <View style={styles.column3}>
                  <Text style={styles.label}>
                    {new Date(item.exit).toUTCString().substring(17, 29)}
                  </Text>
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
    marginBottom: 10,
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1%",
    paddingVertical: "5%",
  },
  column1: {
    width: "40%",
    paddingLeft: "5%",
  },
  column2: {
    width: "20%",
  },
  column3: {
    width: "45%",
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

export default Attendance;
