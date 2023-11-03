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
    <div className="text-lg py-6 px-10 space-y-2">
      <div className="flex">
        <div className="text-gray-700 font-[Fantasy] text-5xl underline underline-offset-8 decoration-2">{lodaer && Profile.Name}</div>
      </div>
      
      <div className="text-2xl font-bold pt-7 ">General info</div>

      <div className="flex">
        <div className="w-1/5">District</div>{" "}
        <div className="flex text-gray-700">
          :   {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}{" "}
        </div>
      </div>
      <div className="flex">
        <div className="w-1/5">E-mail</div>
        <div className="flex text-gray-700">: {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
      <div className="flex">
        <div className="w-1/5">Contact Number </div>
        <div className="flex text-gray-700">: {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
      <div className="flex">
        <div className="w-1/5">Data of Birth </div>{" "}
        <div className="flex text-gray-700">: {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
      <div className="flex">
        <div className="w-1/5">Area </div>
        <div className="flex text-gray-700">: {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
      <div className="flex">
        <div className="w-1/5">Taluka </div>{" "}
        <div className="flex text-gray-700">:  {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
      <div className="flex">
        <div className="w-1/5">Operational Since </div>
        <div className="flex text-gray-700">:  {lodaer && <div className="px-4">{Profile.DistrictId.District}</div>}</div>
      </div>
    </div>
  );
};

export default Profile;
