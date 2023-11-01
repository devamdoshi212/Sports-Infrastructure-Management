import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useSelector } from "react-redux";
const Profile = () => {
  const AuthorityData = useSelector((state) => state.user.user);
  console.log(AuthorityData);
  const [lodaer, setloader] = useState(false);
  const [Profile, setProfile] = useState([{}]);

  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 600,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#EEEEEEFF",
        },
      },
      (err, qrCodeDataUrl) => {
        if (err) {
          console.error(err);
          return;
        }

        // Convert the data URL to a Blob
        fetch(qrCodeDataUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const formData = new FormData();
            formData.append("qrcode", blob, "qrcode.png");

            // Now you can use the formData for your desired operation
          })
          .catch((error) => {
            console.error("Error converting QR code data URL to Blob:", error);
          });

        setQr(qrCodeDataUrl);
      }
    );
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getuserwithsportscomplex?_id=${AuthorityData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setloader(true);
        setProfile(result.data[0]);
      })
      .catch((error) => console.log("error", error));
    setUrl(AuthorityData.SportComplexId);
  }, []);

  return (
    <div className="text-3xl">
      <div>Manager Name : {lodaer && Profile.Name}</div>
      <div>Sports Complex Name : {lodaer && Profile.SportComplexId.name}</div>
      <div className="">
        <button onClick={GenerateQRCode} className="bg-black text-white">
          Generate QR code for your Complex
        </button>
        {qr && (
          <>
            <img src={qr} alt="qrcode" />
            <a href={qr} download="qrcode.png">
              Download
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
