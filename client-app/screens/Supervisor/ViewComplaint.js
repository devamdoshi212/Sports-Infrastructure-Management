import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
function ViewComplaint() {
  const navigate = useNavigation();
  const [value, setValue] = useState();
  return (
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            View Complaint
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: "white",
          marginHorizontal: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, alignSelf: "center" }}>
          Name :
        </Text>
        <Text style={{ alignSelf: "center", paddingLeft: 10 }}>John Doe</Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 250,
            marginBottom: 15,
          }}
        >
          <ScrollView>
            <Text style={{ fontWeight: "bold", paddingBottom: 7 }}>
              Complaint:
            </Text>
            <Text> folder\AwesomeProject\node_modules\@babel\parser\li</Text>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 250,
          }}
        >
          <ScrollView>
            <TextInput multiline editable placeholder="Type here"></TextInput>
          </ScrollView>
        </View>
        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginTop: 25,
          }}
        >
          <Button title="Response"></Button>
          <Button title="Forward"></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 0,
    paddingTop: 51,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
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
});

export default ViewComplaint;
