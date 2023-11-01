import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
export default function QR({ navigation }) {
  const userdata = useSelector((state) => state.user.User);
  const ip = ipconfig.ip;
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [complexid, setcomplexid] = useState("");
  const [athleteid, setathleteid] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://${ip}:9999/getAthleteswithsupervisor?userId=${userdata._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // console.log(result.data[0].createdBy.SportComplexId);
          setathleteid(result.data[0]._id);
          setcomplexid(result.data[0].createdBy.SportComplexId);
        })
        .catch((error) => console.log("error", error));
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    if (data === complexid) {
      console.log(`Data: ${data}`);
      console.log(`Type: ${type}`);
      Alert.alert("Alert Title", "Scan Successfully", [
        // {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        // },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("AthelteSearch");
          },
        },
      ]);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // const id = userdata._id.toString();
      var raw = JSON.stringify({
        userId: userdata._id,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`http://${ip}:9999/addSession/${data}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    } else {
      Alert.alert(
        "Alert Title",
        "You are not added in any particular sports complex",
        [
          // {
          //     text: 'Cancel',
          //     onPress: () => console.log('Cancel Pressed'),
          //     style: 'cancel',
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      {scanData && (
        <Button title="Scan Again?" onPress={() => setScanData(undefined)} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
