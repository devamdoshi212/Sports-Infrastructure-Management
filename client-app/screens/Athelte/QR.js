import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
export default function QR({ navigation }) {
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI * lat1) / 180;
    const radLon1 = (Math.PI * lon1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLon2 = (Math.PI * lon2) / 180;

    // Haversine formula
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const latitude1 = 19.7514798; // Latitude of the first point
    const longitude1 = 75.7138884;
    console.log(location);
    const distance = haversineDistance(
      latitude1,
      longitude1,
      location.coords.latitude,
      location.coords.longitude
    );
    const data = distance.toFixed(2);
    console.log(
      `The distance between the two points is ${distance.toFixed(
        2
      )} kilometers.`
    );
    if (data < 1) {
      alert("Your Attendance has been successfully saved");
    } else {
      alert("You are not in Range ");
    }
  }

  const userdata = useSelector((state) => state.user.User);
  // console.log(userdata);
  const AthelteData = useSelector((state) => state.athelte.Athelte);

  const complexId = AthelteData[0].createdBy.SportComplexId;
  const ip = ipconfig.ip;
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState(undefined);
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
    setScanData(undefined);
  }, [scanData]);

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
            getLocationHandler();
          },
        },
        // navigation.navigate("AthelteSearch");
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
          if (result.rcode == 200) {
            navigation.navigate("AthelteSearch");
          } else {
            Alert.alert("Alert Title", "Exit Done", [
              // {
              //     text: 'Cancel',
              //     onPress: () => console.log('Cancel Pressed'),
              //     style: 'cancel',
              // },
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("ExitForm");
                },
              },
            ]);
          }
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
