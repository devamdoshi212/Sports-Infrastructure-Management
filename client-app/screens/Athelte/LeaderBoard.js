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
import ipconfig from "../../ipconfig";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons

import Leaderboard from "react-native-leaderboard";
import { useSelector } from "react-redux";
const LeaderBoard = ({ navigation }) => {
  const ip = ipconfig.ip;
  const AthelteData = useSelector((s) => s.athelte.Athelte);
  const [image, setimage] = useState("../../assets/icon.png");
  const [userdata, setuserdata] = useState([
    {
      name: "Adam Savage",
      score: 12,
      iconUrl:
        "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
    },
  ]);
  const [atheltedata, setatheltedata] = useState([
    {
      name: "We Tu Lo",
      score: null,
      iconUrl:
        "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg",
    },
  ]);

  useEffect(() => {
    const i = AthelteData[0].baseUrl.slice(1);
    setimage(i);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getAthletesWithRating?id=${AthelteData[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setuserdata(result.currentuserdata);
        let temp = result.data1.map((item) => {
          let iconUrl = item.iconUrl.slice(1);
          return { ...item, iconUrl: `http://${ip}:9999/${iconUrl}` };
        });
        setatheltedata(temp);
      })
      .catch((error) => console.log("error", error));
  }, [image]);
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
              LeaderBoard
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>4th</Text>
          <View style={styles.profileImage}>
            <Image
              style={{
                width: 125,
                height: 125,
                borderRadius: 62.5,
                borderColor: "#fbe8e0",
                borderWidth: 5,
              }}
              source={{ uri: `http://${ip}:9999/${image}` }}
            />
          </View>
          <Text style={styles.label}>
            {userdata[0].score ? userdata[0].score.toFixed(3) : ""}
          </Text>
          <View>
            <TouchableOpacity>
              <MaterialIcons name="share" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <Leaderboard
          labelBy="name"
          sortBy="score"
          icon="iconUrl"
          data={atheltedata}
          onRowPress={(item, index) => {
            alert(item.name + " clicked");
          }}
          evenRowColor="#edfcf9"
          oddRowColor="#ffffff"
        />
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
    justifyContent: "center",
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
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    height: "22%",
    flexDirection: "row",
    width: "95%",
    marginLeft: "2.5%",
  },
  profileImage: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default LeaderBoard;
