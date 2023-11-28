import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BookSlot = ({ navigation, route }) => {
  const ip = ipconfig.ip;
  console.log(route.params.data.sport);
  const sportid = route.params.data.sport;

  const complexId = route.params.complexId;
  const [sport, setSport] = useState([]);
  const [selectedtimeSlot, setselectedTimeSlot] = useState("");
  const [Notification, Setnotification] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todate, settodate] = useState(new Date());
  const [text, settext] = useState("");
  const sumbitHandler = () => {
    //     from: selectedtimeSlot.split("-")[0],
    //   to: selectedtimeSlot.split("-")[1],
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch(
    //   `http://${ip}:9999/getPaymentTimeslotCount?timeSlotTo=sas&timeSlotFrom=sd&sportsComplex=da&sports=da`,
    //   requestOptions
    // )
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error));

    navigation.navigate("bookslotdetails", {
      from: selectedDate,
      to: todate,
      text: text,
      timeslot: selectedtimeSlot,
      sportid: sportid,
      complexId: complexId,
    });

    // console.log(instructorid, selectedsport, selectedtimeSlot, Notification);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   from: selectedtimeSlot.split("-")[0],
    //   to: selectedtimeSlot.split("-")[1],
    //   message: Notification,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch(
    //   `http://${ip}:9999/getAtheleteIdFromPayment?sports=${selectedsport}&instructorId=${instructorid}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => console.log(result.userId))
    //   .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    (() => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://${ip}:9999/gettimeslotforguest?sportId=${sportid}&SportComplexId=${complexId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setSport(result.data);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);
  //
  const handleConfirm = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
    hideDatePicker();
  };

  const handletoConfirm = (date) => {
    settodate(date);
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
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
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Book Your Slot
            </Text>
          </View>
        </View>
        <Picker
          selectedValue={selectedtimeSlot}
          onValueChange={(value, index) => {
            setselectedTimeSlot(value);
          }}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="Please select a Time-Slot" value="" />
          {sport.map((item, index) => {
            return (
              <Picker.Item
                label={item.from + "-" + item.to}
                value={item.from + "-" + item.to}
                key={index}
              />
            );
          })}
        </Picker>
        <TouchableOpacity onPress={showDatePicker}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.dobContainer}>
            <TextInput
              placeholder="Select Your From date"
              editable={false}
              style={{ color: "black" }}
              value={selectedDate.toDateString()}
            ></TextInput>
            <Icon
              name="calendar"
              size={24}
              color="#3498db"
              style={styles.calendaricon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatePicker}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handletoConfirm}
            onCancel={hideDatePicker}
          />
          <View style={styles.dobContainer}>
            <TextInput
              placeholder="Select Your From date"
              editable={false}
              style={{ color: "black" }}
              value={todate.toDateString()}
            ></TextInput>
            <Icon
              name="calendar"
              size={24}
              color="#3498db"
              style={styles.calendaricon}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 60,
          }}
        >
          <ScrollView>
            <TextInput
              onChangeText={(text) => settext(text)}
              value={text}
              keyboardType="numeric"
              placeholder="Number of User"
              maxLength={1}
            />
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.button} onPress={sumbitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    paddingLeft: "5%",
    height: 50,
    backgroundColor: "#fbe8e0",
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
  picker: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "#f2b69c",
    marginBottom: "5%",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#f2b69c",
    padding: "2%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "10%",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default BookSlot;
