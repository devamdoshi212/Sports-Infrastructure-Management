import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CheckboxWithLabel = ({
  label,
  value,
  onValueChange,
  disabled,
  style,
}) => {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        style={styles.checkbox}
        color="#007bff" // Change checkbox color
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </View>
  );
};

const Form = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [instructor, setinstructor] = useState([]);
  const [instructoroption, setinstructoroption] = useState("");
  const [timeoption, settimeoption] = useState("");
  // const [timeslot, settimeslot] = useState([]);
  const [date, setdate] = useState(new Date());
  const [duration, setduration] = useState("");
  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [athleteDetail, setAthleteDetails] = useState([]);
  const userdata = useSelector((state) => state.user.User);
  const ip = ipconfig.ip;
  const [sports, setsports] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const getinstructor = () => {
      if (selectedOption) {
        fetch(
          `http://${ip}:9999/getInstructorForPayment?sportId=${selectedOption}&sportComplexId=${userdata.SportComplexId}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setinstructor(result.data);
          })
          .catch((error) => console.log("error", error));
      }
    };
    getinstructor();
    fetch(
      `http://${ip}:9999/getSportsComplexwithsport?_id=${userdata.SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setsports(result.data[0].sports);
      })
      .catch((error) => console.log("error", error));
  }, [selectedOption]);

  const handleLogin = () => {
    // Handle login logic here, e.g., authentication with API

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/getuserwithathelte?Email=${email}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.rcode===200);
        if (result.rcode === 200) {
          console.log(result.data);
          setUserDetail(result.data);
          setAthleteDetails(result.athleteDetail[0]);
          setUser(true);
        } else {
          alert("No User Found");
          setUser(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // const [isChecked, setIsChecked] = React.useState(() => {
  //   // Create an initial state object based on the Sports data
  //   const initialState = {};

  //   // Assuming Sports is an array with SportName property
  //   sports.forEach((sport) => {
  //     initialState[sport.SportName] = false;
  //   });

  //   return initialState;
  // });

  // const handleChange = (option) => {
  //   setIsChecked({ ...isChecked, [option]: !isChecked[option] });
  //   if (!isChecked[option]) {
  //     console.log(`${option} is checked.`);
  //   }
  // };

  // const checkboxOptions = [
  //   { label: "Option 1", value: "option1" },
  //   { label: "Option 2", value: "option2" },
  //   { label: "Option 3", value: "option3" },
  // ];

  // const renderCheckboxes = () => {
  //   return sports.map((sports, index) => {
  //     return (
  //       <CheckboxWithLabel
  //         key={index}
  //         label={sports.sport.SportName}
  //         value={isChecked[sports.sport._id]}
  //         onValueChange={() => handleChange(sports.sport._id)}
  //         disabled={false}
  //         style={styles.checkboxItem}
  //       />
  //     );
  //   });
  // };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDropdownChange = (itemValue) => {
    setSelectedOption(itemValue);
  };
  const handleDropdownInstructorChange = (itemValue) => {
    setinstructoroption(itemValue);
  };
  const handleDropdownTimeChange = (itemValue) => {
    settimeoption(itemValue);
  };
  const handleDropdownDurationChange = (itemValue) => {
    setduration(itemValue);
  };
  const handleConfirm = (date) => {
    // handleInput("DOB", date);
    setdate(date);
    hideDatePicker();
  };

  const paymenthandler = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sports: selectedOption,
      athleteId: athleteDetail._id,
      duration: duration,
      instructorId: instructoroption,
      paymentTakenBy: userdata._id,
      timeSlot: {
        from: timeoption.split("-")[0],
        to: timeoption.split("-")[1],
      },
      from: date,
      sportsComplexId: userdata.SportComplexId,
      supervisorId: userdata._id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/paymentdetail`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Athlete Added ", "Account Created Successfully", [
          // {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          // },
          {
            text: "OK",
            onPress: () => navigation.navigate("MainProfile"),
          },
        ]);
      })
      .catch((error) => console.log("error", error));
  };
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
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Sports Authority of Gujarat
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Check Email</Text>
          </TouchableOpacity>
          {user && (
            <View style={styles.userInfo}>
              <View style={styles.userInfoCard}>
                <Text style={styles.userInfoText}>Name: {userDetail.Name}</Text>
                <Text style={styles.userInfoText}>
                  Email: {userDetail.Email}
                </Text>
                <Text style={styles.userInfoText}>
                  Mobile Number: {userDetail.ContactNum}
                </Text>
                <Text style={styles.userInfoText}>
                  Blood Group: {athleteDetail.bloodGroup}
                </Text>
                <Text style={styles.userInfoText}>
                  Date of Birth: {userDetail.DOB}
                </Text>
                <Text style={styles.userInfoText}>
                  Disability: {athleteDetail.disability}
                </Text>
                <Text style={styles.userInfoText}>
                  Health Issue: {athleteDetail.healthIssue}
                </Text>
                <Text style={styles.userInfoText}>
                  Address: {athleteDetail.address}
                </Text>
                <Text style={styles.userInfoText}>
                  Emergency Number: {athleteDetail.emergencyNumber}
                </Text>
              </View>
              <Picker
                style={styles.dropdownPicker}
                selectedValue={selectedOption}
                onValueChange={handleDropdownChange}
              >
                <Picker.Item label="Select Facility" value="" />
                {sports.map((item, index) => (
                  <Picker.Item
                    label={
                      item.sport.SportName + "    (" + item.fees + "  Fees )"
                    }
                    value={item.sport._id}
                    key={index}
                  />
                ))}
              </Picker>
              {selectedOption && (
                // <View>
                <Picker
                  style={styles.dropdownPicker}
                  selectedValue={instructoroption}
                  onValueChange={handleDropdownInstructorChange}
                >
                  <Picker.Item label="Select Instructor" value="" />
                  {instructor.map((item, index) => (
                    <Picker.Item
                      label={item.instructorname}
                      value={item.instructorid}
                      key={index}
                    />
                  ))}
                </Picker>
                // </View>
              )}
              {instructoroption && (
                <Picker
                  style={styles.dropdownPicker}
                  selectedValue={timeoption}
                  onValueChange={handleDropdownTimeChange}
                >
                  <Picker.Item label="Select Time Slot" value="" />

                  {instructor
                    .find(
                      ({ instructorid }) => instructorid === instructoroption
                    )
                    .timeslot.map((item, index) => (
                      <Picker.Item
                        label={item.from + "  to  " + item.to}
                        value={item.from + "-" + item.to}
                        key={index}
                      />
                    ))}
                </Picker>
              )}
              {timeoption && (
                <Picker
                  style={styles.dropdownPicker}
                  selectedValue={duration}
                  onValueChange={handleDropdownDurationChange}
                >
                  <Picker.Item label="Select Duration" value="" />
                  <Picker.Item label="1 month" value="1" />
                  <Picker.Item label="2 months" value="2" />
                  <Picker.Item label="3 months" value="3" />
                  <Picker.Item label="6 months" value="6" />
                  <Picker.Item label="1 Year" value="12" />
                </Picker>
              )}
              {duration && (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Select Date To Start"
                    value={date.toDateString()}
                    style={{
                      width: "65%",
                      height: 40,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  />
                  <Button
                    title="Select Date"
                    onPress={showDatePicker}
                    style={{
                      width: "40%",
                      height: 30,
                      borderWidth: 1,
                      marginRight: 10,
                      borderColor: "#ccc",
                      marginBottom: 15,
                      borderRadius: 5,
                    }}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              )}

              <TouchableOpacity
                style={styles.signupButton}
                onPress={paymenthandler}
              >
                <Text style={styles.buttonText}>Add Athlete to Complex</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
    height: "100%",
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
  form: {
    flex: 2,
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#d7a592",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  userInfo: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: "5%",
  },
  userInfoCard: {
    width: "110%",
    borderWidth: 1,
    backgroundColor: "#f2b69c",
    borderRadius: 15,
    padding: "5%",
    marginBottom: "2%",
    marginTop: "-5%",
    marginLeft: "-5%",
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },
  signupButton: {
    backgroundColor: "#d7a592",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },

  checkboxItem: {
    marginBottom: 10,
  },
  checkbox: {
    color: "#007bff", // Change checkbox color
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  dropdownPicker: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: "#cccc",
  },
  loginContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    color: "blue",
  },
});

export default Form;
