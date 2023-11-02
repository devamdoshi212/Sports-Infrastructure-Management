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
import { useState } from "react";

const Attendance = ({ navigation }) => {
  const [date, setDate] = useState(new Date(1598051730000));
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
          <Pressable
            onPress={() => {
              navigation.navigate("SportAttendance");
            }}
          >
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.column1}>
                  <Text style={styles.label}>Cricket</Text>
                </View>
                <View style={styles.column2}>
                  <Text style={styles.input}>5/15</Text>
                </View>
              </View>
            </View>
          </Pressable>
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
    width: "60%",
    paddingLeft: "5%",
  },
  column2: {
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
