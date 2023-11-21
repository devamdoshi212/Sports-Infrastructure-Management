import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import ipconfig from "../../ipconfig";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
const BadgePerformance = () => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const [data, setdata] = useState([]);
  const [userData, setUserData] = useState({});
  const [sportid, setsportid] = useState();
  const [loading, setLoading] = useState(true);
  const [sportpoints, setsportponits] = useState();
  const OnclickHandler = (e) => {
    console.log(e);
    setsportponits(e.rating);
    setsportid(e);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getAthletesWithAllSportsRating?athleteid=${Atheltedata[0]._id}&userid=${Userdata._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setUserData(result.atheltedata);
        setdata(result.data);
        setsportponits(result.points);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birthdate for the current year hasn't occurred yet, subtract one year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Performance</Text>
        </View>
      </View>
      <View style={styles.feedHeader}>
        <Text style={styles.feedHeaderText}>Sports</Text>
      </View>
      <View
        style={{
          width: "94%",
          marginLeft: "3%",
          borderWidth: 1,
          borderRadius: 5,
          borderBottomWidth: 3,
          padding: 4,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.questionNoBar}
        >
          <View style={styles.buttonContainer}>
            {data.map((item, index) => (
              <TouchableOpacity
                style={styles.button}
                key={index}
                onPress={OnclickHandler.bind(this, item)}
              >
                <Ionicons
                  style={{ alignSelf: "center" }}
                  name="football-outline"
                  size={24}
                />
                <Text style={styles.buttonText}>{item.sports.SportName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.card}>
        <View style={styles.topLeft}>
          <Text style={styles.lable}>Height</Text>
          <Text style={styles.input}>
            {userData.weight ? userData.weight : "-"}
          </Text>
        </View>

        <View style={styles.topRight}>
          <Text style={styles.lable}>Weight</Text>
          <Text style={styles.input}>
            {userData.height ? userData.height : "-"}
          </Text>
        </View>

        <View style={styles.bottomLeft}>
          <Text style={styles.lable}>Age</Text>
          <Text style={styles.input}>{calculateAge(Userdata.DOB)}</Text>
        </View>

        <View style={styles.bottomRight}>
          <Text style={styles.lable}>Points</Text>
          <Text style={styles.input}>{sportpoints}</Text>
        </View>

        <View style={styles.middleContainer}>
          <Image
            source={{ uri: `http://${ip}:9999/${userData.baseUrl.slice(1)}` }}
            style={styles.middleImage}
            resizeMode="cover"
          />
        </View>
      </View>
      {sportid && (
        <View style={styles.card2}>
          <WebView
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error: ", nativeEvent);
            }}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            showsHorizontalScrollIndicator={false}
            style={{
              width: Dimensions.get("screen").width - 35,
              marginTop: 10,
            }}
            source={{
              uri:
                sportid.rating !== 0
                  ? `http://${ip}:9999/athelteperformance/${Atheltedata[0]._id}/${sportid.sports._id}`
                  : "",
            }}
          />
        </View>
      )}
    </View>
  );
};

export default BadgePerformance;
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fbe8e8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "90%",
    paddingLeft: "5%",
    backgroundColor: "#fbe8e8",
  },
  back: {
    marginRight: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8%",
    marginLeft: "5%",
  },
  feedHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 7,
    flex: 1,
    height: 70,
  },
  buttonText: {
    color: "white",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "5%",
    width: "94%",
    height: "30%",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: "5%",
    backgroundColor: "#f2b69c",
    justifyContent: "space-evenly",
    position: "relative",
  },
  topLeft: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  topRight: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  bottomRight: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Adjust this width according to your layout
    height: "100%", // Adjust this height according to your layout
  },
  middleImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card2: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "5%",
    width: "94%",
    height: "39%",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: "5%",
    backgroundColor: "#f2b69c",
    justifyContent: "space-evenly",
    // marginTop:"-50%",
  },
  row: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  column1: {
    width: "35%",
  },
  column2: {
    width: "35%",
  },
  lable: {
    fontSize: 18,
    color: "grey",
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
  },
  // teamContainer: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     borderBottomWidth: 1,
  //     borderTopWidth: 1,
  //     paddingVertical: 2,
  // },

  // teamRow: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     gap: 2,
  // },
  // teamLogo: {
  //     width: 40,
  //     height: 40,
  // },
  // scoreContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     gap: 2,
  // },
  // scoreText: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  // },
});
