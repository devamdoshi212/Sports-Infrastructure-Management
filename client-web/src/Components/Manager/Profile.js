import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useSelector } from "react-redux";
const Profile = () => {
  const AuthorityData = useSelector((state) => state.user.user);
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
          <div className="text-gray-700 font-[Fantasy] text-5xl underline underline-offset-8 decoration-2">
            {" "}
            {lodaer && Profile.Name}
          </div>
        </div>
        <div className="text-2xl font-bold pt-7 ">General info</div>
        <div className="flex">
          <div className="w-1/3">Sports Complex Name </div>
          <div className="text-gray-700 flex">
            :{" "}
            {lodaer && (
              <div className="px-4">{Profile.SportComplexId.name}</div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">E-mail</div>
          <div className="text-gray-700 flex">
            :{lodaer && <div className="px-4">{AuthorityData.Email}</div>}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Contact Number </div>
          <div className="text-gray-700 flex">
            : {lodaer && <div className="px-4">{AuthorityData.ContactNum}</div>}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Data of Birth </div>
          <div className="text-gray-700 flex">
            : {lodaer && <div className="px-4">{AuthorityData.DOB}</div>}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Area </div>
          <div className="text-gray-700 flex">
            :{" "}
            {lodaer && (
              <div className="px-4">{Profile.SportComplexId.area}</div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Taluka </div>
          <div className="text-gray-700 flex">
            :{" "}
            {lodaer && (
              <div className="px-4">{Profile.SportComplexId.taluka}</div>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/3">Operational Since </div>
          <div className="text-gray-700 flex">
            :{" "}
            {lodaer && (
              <div className="px-4">
                {Profile.SportComplexId.operationalSince}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <button
          onClick={GenerateQRCode}
          className="mt-2 p-2 bg-black text-white"
        >
          Generate QR code for your Complex
        </button>
        {qr && (
          <>
            <img className="w-1/2" src={qr} alt="qrcode" />
            <button className="realtive z-10  rounded-lg h-12 p-2 m-4 bg-[#196bde] text-white overflow-hidden hover:shadow-md hover:shadow-gray-800 hover:border-gray-300">
              <a href={qr} download="qrcode.png">
                Download
              </a>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
