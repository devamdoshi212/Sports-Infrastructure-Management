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
    <div className="text-lg px-7 py-7 flex ">
    <div className="w-4/5 space-y-2">
    <div className="flex">
      <div className="w-1/3">Manager Name </div> <div className="text-gray-700">:  {lodaer && Profile.Name}</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Sports Complex Name </div> <div className="text-gray-700">:  {lodaer && Profile.SportComplexId.name}</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">E-mail</div> <div className="text-gray-700">:</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Contact Number </div> <div className="text-gray-700">:</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Data of Birth </div> <div className="text-gray-700">:</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Area </div> <div className="text-gray-700">:</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Taluka </div> <div className="text-gray-700">:</div> 
    </div>
    <div className="flex">
      <div className="w-1/3">Operational Since </div> <div className="text-gray-700">:</div> 
    </div>
    </div>

    
      <div className="">
        <button onClick={GenerateQRCode} className="mt-2 p-2 bg-black text-white">
          Generate QR code for your Complex
        </button>
        {qr && (
          <>
            <img className="w-1/2" src={qr} alt="qrcode" />
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
