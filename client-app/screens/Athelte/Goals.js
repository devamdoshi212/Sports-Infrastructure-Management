import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";

import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const calculateRemainingDays = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = Math.abs(target - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
const Goals = () => {
  const navigation = useNavigation();
  const navigate = useNavigation();

  const ip = ipconfig.ip;
  const [refresh, setrefresh] = useState(false);
  const Userdata = useSelector((state) => state.user.User);
  const { _id } = useSelector((state) => state.athelte.Athelte[0]);

  const [date, setDate] = useState(new Date());
  const [dateCal, setDateCal] = useState(new Date());
  const [achieved, setachived] = useState(0);
  const [goals, setGoals] = useState([]);

  const refreshhandler = () => {
    setrefresh(!refresh);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getAthleteWithGoals?_id=${_id}&achieved=${achieved}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setGoals(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [refresh, achieved]);
  return (
    <>
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
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Goals</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddGoals");
              }}
            >
              <View style={styles.complaint}>
                <Text style={styles.actionText}>Add Goals</Text>
                {/* <AntDesign
                  style={{ color: "black", marginLeft: "5%" }}
                  name="plus"
                  size={30}
                /> */}
                <Entypo
                  style={{ color: "#0054a8", marginLeft: "5%" }}
                  name="plus"
                  size={30}
                />
              </View>
            </TouchableOpacity>
            <Calendar
              // Specify style for calendar container element. Default = {}
              style={{
                height: 350,
                borderRadius: 15,
                width: "95%",
                alignSelf: "center",
              }}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#d9e1e8",
                selectedDayBackgroundColor: "pink",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "orange",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#f2b69c",
                indicatorColor: "#f2b69c",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
              onDayPress={(day) => {
                setDate(new Date(day.timestamp));
                // console.log("selected date", day.dateString);
                setDateCal(day.dateString);
              }}
              markedDates={{
                [dateCal]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
              enableSwipeMonths={true}
            />
            <View style={styles.twobutton}>
              <TouchableOpacity
                style={achieved == 0 ? styles.button : styles.onpressbutton}
                onPress={() => {
                  setachived(0);
                }}
              >
                <Text style={styles.buttonText}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={achieved == 1 ? styles.button : styles.onpressbutton}
                onPress={() => {
                  setachived(1);
                }}
              >
                <Text style={styles.buttonText}>Completed</Text>
              </TouchableOpacity>
            </View>
          </View>
          {goals.map((item, index) => (
            <View style={styles.card} key={index}>
              {item.achieved == 0 ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate("GoalDetail", {
                      data: item,
                    });
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#f8d7c9" : "#f2b69c",
                      padding: 20,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <View style={styles.row}>
                    <View style={styles.column1}>
                      <Text style={styles.titlelabel}>{item.title}</Text>
                      <View style={styles.row}>
                        <Text style={styles.label}>Target Date : </Text>
                        <Text style={styles.label}>
                          {item.targetdate.split("T")[0]}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Remaining Days : </Text>
                        <Text style={styles.label}>
                          {calculateRemainingDays(item.targetdate)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.column3}>
                      <Entypo
                        style={{ color: "#0054a8" }}
                        name="eye"
                        size={24}
                      />
                    </View>
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    navigation.navigate("GoalDetail");
                  }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#f8d7c9" : "#f2b69c",
                      padding: 20,
                      borderRadius: 10,
                    },
                  ]}
                >
                  <View style={styles.row}>
                    <View style={styles.column1}>
                      <Text style={styles.titlelabel}>{item.title}</Text>
                      <View style={styles.row}>
                        <Text style={styles.label}>Start Date : </Text>
                        <Text style={styles.label}>
                          {item.startdate.split("T")[0]}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Goal Achieved at : </Text>
                        <Text style={styles.label}>
                          {item.actualdate.split("T")[0]}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.column3}>
                      <Entypo
                        style={{ color: "#0054a8" }}
                        name="eye"
                        size={24}
                      />
                    </View>
                  </View>
                </Pressable>
              )}
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
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "85%",
    paddingLeft: "5%",
    height: 50,
    backgroundColor: "#fbe8e0",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "95%",
  },
  complaint: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    // height: 40,
    borderRadius: 10,
    backgroundColor: "#f2b69c",
    marginLeft: "5%",
    padding: "1%",
    marginBottom: 10,
  },
  actionText: {
    marginLeft: "5%",
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  pickerContainer: {
    // backgroundColor: "#f2b69c",
    borderRadius: 5,
    marginBottom: 15,
    width: "90%",
    marginLeft: "5%",
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
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "5%",
  },
  column1: {
    width: "60%",
  },
  column3: {},
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  titlelabel: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    marginLeft: 6,
    textAlign: "center",
  },
  twobutton: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    // height: 40,
    borderRadius: 10,
    backgroundColor: "#fbe8e0",
    marginLeft: "5%",
    padding: "1%",
    marginTop: 10,
    marginBottom: 10,
  },
  onpressbutton: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  button: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "#f2b69c",
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Goals;
