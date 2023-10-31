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
import { useSelector } from "react-redux";
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

// const fetchsportsofcomplex = (id) => {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   fetch(
//     `http://${ipconfig.ip}:9999/getSportsComplexwithsport?_id=${id}`,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       return result.data[0].sports;
//     })
//     .catch((error) => console.log("error", error));
// };
const fetchsportsofcomplex = (id) => {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ipconfig.ip}:9999/getSportsComplexwithsport?_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        resolve(result.data[0].sports);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const AddAthelte = ({ navigation }) => {
  const { SportComplexId } = useSelector((state) => state.user.User);
  const [Sports, setSports] = useState([
    {
      sport: {
        _id: "6540e2b1af277f6329395500",
        SportName: "Cricket",
      },
    },
  ]);
  setSports(fetchsportsofcomplex(SportComplexId));
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState("getSports");

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const sportsData = await fetchsportsofcomplex(SportComplexId);
        setSports(sportsData);
      } catch (error) {
        console.error("Error fetching sports data: ", error);
        // Handle error if the fetch fails
      }
    };

    fetchSportsData();
  }, [SportComplexId]);
  const handleLogin = () => {
    console.log(SportComplexId);

    // Handle login logic here, e.g., authentication with API
  };

  const [isChecked, setIsChecked] = React.useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleChange = (option) => {
    setIsChecked({ ...isChecked, [option]: !isChecked[option] });
    if (!isChecked[option]) {
      console.log(`${option}ischecked.`);
    }
  };

  const checkboxOptions = [];

  const renderCheckboxes = () => {
    return Sports.map((option, index) => {
      return (
        <CheckboxWithLabel
          key={index}
          label={option.sport.SportName}
          value={isChecked[option.sport._id]}
          onValueChange={() => handleChange(option.value)}
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
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>Name: UDAY GOHEL</Text>
          <Text style={styles.userInfoText}>Email: UDAY@GOHEL</Text>
          <Text style={styles.userInfoText}>Mobile Number: 94816165164</Text>
          <Text style={styles.userInfoText}>Blood Group: B+</Text>
          <Text style={styles.userInfoText}>Date of Birth: 11-11-2003</Text>
          <Text style={styles.userInfoText}>Disability: 3</Text>
          <Text style={styles.userInfoText}>Health Issue: NONE</Text>
          <Text style={styles.userInfoText}>Address: DHORAJI</Text>
          <Text style={styles.userInfoText}>Emergency Number: 94094748494</Text>
        </View>
        {Sports && (
          <View style={styles.checkboxContainer}>{renderCheckboxes()}</View>
        )}
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

export default AddAthelte;
