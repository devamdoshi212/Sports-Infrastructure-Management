import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
// import * as Print from "expo";
import { useNavigation } from "@react-navigation/native";
import { Asset } from 'expo-asset';
import * as FileSystem from "expo-file-system";

const getHtmlContent = (imageBase64) => `
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Receipt</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #f0f0f0;
        width: 100%;
        height: 100vh;
      }
      .logo img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 10%;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
      }
      .subtitle {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
        text-align: center;
      }
      .details {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        font-size: 16px;
      }

      .details hr {
        border: 0;
        border-top: 1px solid #ccc;
        margin: 0;
      }
      .detaildiv {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
      .disclaimer {
        color: #252525;
        font-size: 14px;
        text-align: center;
        margin: 20px;
      }

      .bold {
        /* Adjust this width as needed */
        width: 25%;
        padding-left: 25%;
        text-align: left;
      }
      .content {
        color: rgb(55, 54, 54);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
        src="data:image/png;base64,${imageBase64}"
        alt="Logo"
        />
      </div>
      <div class="title">Sports Authority of Gujarat</div>
      <div class="subtitle">E-receipt</div>

      <div class="details">
        <div class="detaildiv">
          <div class="bold"><b>Sport</b></div>
        </div>
        <hr />
        <div class="detaildiv">
          <div class="bold"><b>Date & Time</b></div>
          <div class="content">Hello</div>
          </div>
          <hr />
          
          <div class="detaildiv">
          <div class="bold"><b>Athlete Name</b></div>
          <div class="content">Hello</div>
        </div>
        <hr />

        <div class="detaildiv">
          <div class="bold"><b>Athlete ID</b></div>
          <div class="content">Hello</div>
        </div>
        <hr />

        <div class="detaildiv">
          <div class="bold"><b>Duration</b></div>
          <div class="content">: 3 months</div>
        </div>
        <hr />

        <div class="detaildiv">
          <div class="bold"><b>Instructor Name</b></div>
          <div class="content">: 123456789</div>
        </div>
        <hr />
        <div class="detaildiv">
          <div class="bold"><b>Payment Taken By</b></div>
          <div class="content">: 1234343667</div>
        </div>
        <hr />
        <div class="detaildiv">
          <div class="bold"><b>Sports Complex Name</b></div>
        </div>
        <hr />
        <div class="detaildiv">
          <div class="bold"><b>Fees Paid</b></div>
        </div>
        <hr />
        <div class="detaildiv">
          <div class="bold"><b>Total Amount</b></div>
        </div>
        <hr />
      </div>

      <div class="disclaimer">
        *** This is an automatically generated receipt ***
      </div>
    </div>
  </body>
</html>
`;

const getImageBase64 = async () => {
    try {
        // const imageUri = FileSystem.documentDirectory + './client-app/assets/Logo.png';
        const image = Asset.fromModule(require('./../../assets/Logo.png'));
        await image.downloadAsync();
        const imageUri = image.localUri;
        console.log(imageUri);
        const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        return base64;
    } catch (error) {
        console.error("Error reading image:", error);
        return "";
    }
};

const ModalView = (props) => {
    const handlePrintPDF = async () => {
        try {
            const imageBase64 = await getImageBase64();
            const htmlContent = getHtmlContent(imageBase64);
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            const pdfName = "receipt.pdf";
            const pdfPath = FileSystem.cacheDirectory + pdfName;
            await FileSystem.moveAsync({
                from: uri,
                to: pdfPath,
            });

            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(pdfPath);
            } else {
                console.log("Sharing is not available on this platform");
            }
        } catch (error) {
            console.error("Error generating or sharing PDF:", error);
        }
    };

    const [modalVisible, setModalVisible] = useState(props.show);
    const navigate = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name :</Text>
                        <Text style={styles.input}>{props.data.athleteName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Amount :</Text>
                        <Text style={styles.input}>{props.data.amount}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Sport :</Text>
                        <Text style={styles.input}>{props.data.sportName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Complex_Name :</Text>
                        <Text style={styles.input}>{props.data.sportComplexName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>From :</Text>
                        <Text style={styles.input}>{props.data.from}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To :</Text>
                        <Text style={styles.input}>{props.data.to}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handlePrintPDF}
                    >
                        <Text style={styles.buttonText}>Print</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#fbe8e0",
        padding: 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 30,
        marginVertical: 20,
        width: "90%",
        alignSelf: "center",
    },
    label: {
        fontWeight: "bold",
        fontSize: 17,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        padding: 5,
    },
    input: {
        marginLeft: 6,
        width: "60%",
    },
    loginButton: {
        height: 50,
        backgroundColor: "#f2b69c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
        width: 100,
        alignSelf: "center",
        fontWeight: "bold",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
});

export default ModalView;
