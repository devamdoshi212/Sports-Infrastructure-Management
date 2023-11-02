import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const AuthorityData = useSelector((state) => state.user.user);
  const [lodaer, setloader] = useState(false);
  const [Profile, setProfile] = useState([{}]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getuserwithdistrict?_id=${AuthorityData._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setloader(true);
        setProfile(result.data[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className="text-lg py-6 px-5 space-y-2">
      <div className="flex">
        <div className="w-1/4">Authority Name </div><div className="text-gray-700">: {lodaer && Profile.Name}</div>
      </div>
  
      <div className="flex">
        <div className="w-1/4">District</div> <div className="text-gray-700">: {lodaer && Profile.DistrictId.District} </div>
      </div>
      <div className="flex">
        <div className="w-1/4">E-mail</div><div className="text-gray-700">:</div>
      </div>
      <div className="flex">
        <div className="w-1/4">Contact Number </div><div className="text-gray-700">:</div>
      </div>
      <div className="flex">
        <div className="w-1/4">Data of Birth </div> <div className="text-gray-700">:</div>
      </div>
      <div className="flex">
        <div className="w-1/4">Area </div><div className="text-gray-700">:</div>
      </div>
      <div className="flex">
        <div className="w-1/4">Taluka </div> <div className="text-gray-700">:</div>
      </div>
      <div className="flex">
        <div className="w-1/4">Operational Since </div><div className="text-gray-700">:</div>
      </div>
    </div>
  );
};

export default Profile;
