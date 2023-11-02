import QRCode from "react-native-qrcode-svg";

const QRCodeGenerator = ({ value, size }) => {
  return <QRCode value={value} size={size} />;
};

export default QRCodeGenerator;
