import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import ipconfig from "../../ipconfig";
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
  const ip = ipconfig.ip;
  const [sports, setsports] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getSportsComplexwithsport?_id=6540e57553d1815b95f1c5c5`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setsports(result.data[0].sports);
        // console.log(result.data[0].sports);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("getSports");
  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [athleteDetail, setAthleteDetails] = useState([]);
  const handleLogin = () => {
    // Handle login logic here, e.g., authentication with API

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${ip}:9999/getuserwithathelte?Email=${email}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.rcode === 200) {
          setUserDetail(result.data[0]);
          setAthleteDetails(result.athleteDetail[0]);
          setUser(true);
          console.log("Hello");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [isChecked, setIsChecked] = React.useState(() => {
    // Create an initial state object based on the Sports data
    const initialState = {};

    // Assuming Sports is an array with SportName property
    sports.forEach((sport) => {
      initialState[sport.SportName] = false;
    });

    return initialState;
  });

  const handleChange = (option) => {
    setIsChecked({ ...isChecked, [option]: !isChecked[option] });
    if (!isChecked[option]) {
      console.log(`${option} is checked.`);
    }
  };

  const checkboxOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const renderCheckboxes = () => {
    return sports.map((sports, index) => {
      return (
        <CheckboxWithLabel
          key={index}
          label={sports.sport.SportName}
          value={isChecked[sports.sport._id]}
          onValueChange={() => handleChange(sports.sport._id)}
          disabled={false}
          style={styles.checkboxItem}
        />
      );
    });
  };

  const handleDropdownChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sports Authority of Gujarat</Text>
      </View>
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
            <Text style={styles.userInfoText}>Name: {userDetail.Name}</Text>
            <Text style={styles.userInfoText}>Email: {userDetail.Email}</Text>
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
        )}
        <View style={styles.checkboxContainer}>{renderCheckboxes()}</View>
        <Picker
          style={styles.dropdownPicker}
          selectedValue={selectedOption}
          onValueChange={handleDropdownChange}
        >
          <Picker.Item label="Facilities" value="getSports" />
          <Picker.Item label="Sports Complex" value="getSportsComplex" />
        </Picker>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  form: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  userInfo: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
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
});

export default Form;
