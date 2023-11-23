import React, { useEffect, useState } from "react";
import TopSportwiseComplex from "./Top/TopSportwiseComplex";
import SportComplexTable from "./Top/TopSportComplexTable";
const Topboard = () => {
  const [districtId, setdistrictId] = useState("");
  const [sportId, setsportId] = useState("");
  const [sport, setsports] = useState([]);
  const [district, setDistrict] = useState([]);
  const [dist, setdist] = useState("");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9999/getSports", requestOptions)
      .then((response) => response.json())
      .then((result) => setsports(result.data))
      .catch((error) => console.log("error", error));

    fetch("http://localhost:9999/getDistrict", requestOptions)
      .then((response) => response.json())
      .then((result) => setDistrict(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  const handleDistrict = (e) => {
    setdistrictId(e.target.value);
  };
  const handleSports = (e) => {
    setsportId(e.target.value);
  };
  const handledist = (e) => {
    setdist(e.target.value);
  };
  useEffect(() => {
    if (sport.length > 0) {
      const initialSportId = sport[0]._id;
      setsportId(initialSportId);

      handleSports({ target: { value: initialSportId } });
    }
  }, [district, sport]);

  return (
    <div>
      <div className="flex">
        <div className="w-1/5 relative m-5">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            onChange={handleDistrict}
            value={districtId}
          >
            <option value="" selected>
              select a District
            </option>
            {district.map((item) => (
              <option key={item._id} value={item._id}>
                {item.District}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414l5 5z" />
            </svg>
          </div>
        </div>
        <div className="w-1/5 relative m-5">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            onChange={handleSports}
            value={sportId}
          >
            {sport.map((item, index) => (
              <option key={item._id} value={item._id} selected={index === 0}>
                {item.SportName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414l5 5z" />
            </svg>
          </div>
        </div>
      </div>
      <TopSportwiseComplex districtId={districtId} sportId={sportId} />

      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handledist}
          value={dist}
        >
          <option value="" selected>
            select a District
          </option>
          {district.map((item) => (
            <option key={item._id} value={item._id}>
              {item.District}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414l5 5z" />
          </svg>
        </div>
      </div>
      <SportComplexTable districtId={dist} />
    </div>
  );
};

export default Topboard;
