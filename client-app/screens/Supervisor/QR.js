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
  const [scanData, setScanData] = useState(undefined);
  const [supervisorId, setsupervisorId] = useState("");
  // const [complexid, setcomplexid] = useState("");
  // const [athleteid, setathleteid] = useState("");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [userdata]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    if (data === userdata._id) {
      console.log(`Data: ${data}`);
      console.log(`Type: ${type}`);
      Alert.alert("Scan Successfully", "Athlete Verified", [
        // {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        // },
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("ComplexDetails");
          },
        },
      ]);
    } else {
      Alert.alert("Alert !!!!", "This Athlete is not from your complex. ", [
        // {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        // },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
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
