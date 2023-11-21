import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const AthletePerformance = () => {
  const { athleteid, userid } = useParams();
  const [userdata, setuserdata] = useState("");
  const [atheltedata, setatheltedata] = useState("");
  const [parameterdata, setparameterdata] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getAthletesWithAllSportsRating?athleteid=${athleteid}&userid=${userid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setatheltedata(result.atheltedata);
        setuserdata(result.userdata);
        setparameterdata(result.data);
        console.log(result);
        setloading(true);
      })
      .catch((error) => console.log("error", error));
  }, [loading]);
  if (!loading) {
    return <div>Loading</div>;
  }
  return (
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <div class="text-2xl font-bold">Sports</div>
      </div>
      <div class="flex flex-row gap-2">
        {parameterdata.map((item) => (
          <button class="btn btn-secondary">{item.sports.SportName}</button>
        ))}
      </div>
      {/* <button
        onClick={() => {
          setrefresh(!refresh);
        }}
      >
        Refresh
      </button> */}
      <div class="flex flex-row justify-between items-center border-b border-t py-2">
        <div class="flex flex-row items-center gap-2">
          {/* <img src="libertad.png" alt="Libertad logo" class="w-8 h-8"> */}
          <span>Libertad</span>
        </div>
        <div class="flex flex-row items-center gap-2">
          {/* <img src="gremio.png" alt="Gremio logo" class="w-8 h-8"> */}
          <span>Gremio</span>
        </div>
        <div class="flex flex-row items-center gap-2">
          <span class="text-lg font-bold">0</span>
          <span>:</span>
          <span class="text-lg font-bold">3</span>
        </div>
      </div>
    </div>
  );
};

export default AthletePerformance;
