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
      `http://localhost:9999/getuserwithsportswithcomplex?_id=${AuthorityData._id}`,
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
    <div className="text-3xl">
      <div>Manager Name : {lodaer && Profile.Name}</div>
      <div>Sports Complex Name : {lodaer && Profile.SportComplexId.name}</div>
    </div>
  );
};

export default Profile;
