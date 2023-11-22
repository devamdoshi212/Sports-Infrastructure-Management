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
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";

const Attendance = ({ navigation }) => {
    const Userdata = useSelector((s) => s.user.User);
    const ip = ipconfig.ip;
    const [attendance, setattendance] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dateCal, setDateCal] = useState(new Date());

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
                if (result.data.length === 1) setattendance(result.data[0].enrolls);
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
            // is24Hour: true,
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
                <Calendar
                    // Specify style for calendar container element. Default = {}
                    style={{
                        height: 350,
                        borderRadius: 15,
                        width: "95%",
                        alignSelf: "center",
                        borderWidth: 1,
                        borderBottomWidth:4,
                    }}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        backgroundColor: "#ffffff",
                        calendarBackground: "#ffffff",
                        textSectionTitleColor: "#b6c1cd",
                        textSectionTitleDisabledColor: "#d9e1e8",
                        selectedDayBackgroundColor: "#00adf5",
                        selectedDayTextColor: "#ffffff",
                        todayTextColor: "#00adf5",
                        dayTextColor: "#2d4150",
                        textDisabledColor: "#d9e1e8",
                        dotColor: "#00adf5",
                        selectedDotColor: "#ffffff",
                        arrowColor: "orange",
                        disabledArrowColor: "#d9e1e8",
                        monthTextColor: "blue",
                        indicatorColor: "blue",
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
                {/* <View
          style={{
            width: "93%",
            paddingLeft: "7%",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-around",
            marginTop: "5%",
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
        </View> */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={[styles.card, { borderWidth: 1, borderBottomWidth: 4, backgroundColor:"#f8d7c9"}]}>
                        <View style={styles.row}>
                            <View style={styles.column1}>
                                <Text style={styles.label}>Name</Text>
                            </View>
                            <View style={styles.column2}>
                                <Text style={styles.label}>In Time</Text>
                            </View>
                            <View style={styles.column3}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 17,
                                        paddingLeft: "13%",
                                    }}
                                >
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
        backgroundColor: "#fbe8e0",
        paddingTop: "7%",
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
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth:1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: "1%",
        width: "100%",
        backgroundColor: "#f8d7c9",
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
        width: "30%",
        paddingLeft: "5%",
    },
    column2: {
        width: "35%",
    },
    column3: {
        width: "35%",
    },
    label: {
        fontWeight: "bold",
        fontSize: 17,
    },
    input: {
        marginLeft: 6,
        textAlign: "center",
    },
});

export default Attendance;
