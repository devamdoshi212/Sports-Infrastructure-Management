import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimewiseAnalysis from "../../Admin/Analysis/BarChart/TimeSlotAnalysis";
import CapacityAnalysis from "../../Admin/Analysis/BarChart/CapacityAnalysis";
import ComplaintAnalysis from "../../Admin/Analysis/BarChart/ComplaintAnalysis";
import EnrollAnalysis from "../../Admin/Analysis/BarChart/EnrollAnalysis";
import AgeGroupAnalysis from "../../Admin/Analysis/BarChart/AgeGroupAnalysis";
import AgeGroupwiseCount from "../../Admin/Analysis/BarChart/AgeGroupCount";
import DistrictChart from "./DistrictChart";
import AttendanceAnalysis from "../../Admin/Analysis/BarChart/Attendance";
import GeneralAnalyis from "./GeneralAnalysis";

const AuthorityBarChartAnalysis = () => {
  const [data, setData] = useState([]);
  const [sport, setsports] = useState([]);
  const [timeslot, setTimeslot] = useState("");
  const [min, setminAge] = useState(0);
  const [max, setmaxAge] = useState(100);
  const [sportId, setsportId] = useState("");
  const [year, setYear] = useState("");
  const [CapSport, setCapSport] = useState("");
  const [ToDate, setTodate] = useState("");
  const today = new Date();
  const formattedToday = today.toISOString().substr(0, 10);
  const [fromdate, setFromDate] = useState(formattedToday);
  const [error, setError] = useState("");
  const { DistrictId } = useSelector((state) => state.user.user);
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/getSportsComplex?district=${DistrictId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));

    fetch("http://localhost:9999/getSports", requestOptions)
      .then((response) => response.json())
      .then((result) => setsports(result.data))
      .catch((error) => console.log("error", error));
  }, [DistrictId]);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedOption(data[0]._id);
    }
  }, [data]);
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleTimeslotChange = (e) => {
    setTimeslot(e.target.value);
    setminAge(e.target.value.split("-")[0]);
    setmaxAge(e.target.value.split("-")[1]);
  };
  const handleSports = (e) => {
    setsportId(e.target.value);
  };
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleCapacitySport = (e) => {
    setCapSport(e.target.value);
  };
  const handledatechange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToChange = (e) => {
    const selectedToDate = e.target.value;
    setTodate(selectedToDate);
    if (fromdate && new Date(fromdate) > new Date(selectedToDate)) {
      setError("End date must be equal or after the start date");
      setTodate("");
    } else {
      setError("");
      // Add any additional logic if needed
    }
  };
  return (
    <div>
      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleOptionChange}
          value={selectedOption}
          // defaultValue={data[0]._id}
        >
          {data.map((item, index) => (
            <option key={item._id} value={item._id} selected={index === 0}>
              {item.name}
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
      <TimewiseAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 " />
      <CapacityAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 " />
      <ComplaintAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 " />
      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleCapacitySport}
          value={CapSport}
        >
          <option value="" selected>
            select a Sport
          </option>
          {sport.map((item, index) => (
            <option key={item._id} value={item._id}>
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
      <EnrollAnalysis selectedOption={selectedOption} sportId={CapSport} />
      <hr className="h-px bg-gray-700 " />
      {/* <EnrollLineAnalysis selectedOption={selectedOption} /> */}
      <hr className="h-px bg-gray-700 " />

      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleTimeslotChange}
          value={timeslot}
        >
          <option value="0-100" selected>
            Total
          </option>
          <option value="10-20">10 to 20</option>
          <option value="20-25">20 to 25</option>
          <option value="25-30">25 to 30</option>
          <option value="30-40">30 to 40</option>
          <option value="40-50">40 to 50</option>
          <option value="50-100">More than 50</option>
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
      <AgeGroupAnalysis
        minAge={min}
        maxAge={max}
        selectedOption={selectedOption}
      />
      <hr className="h-px bg-gray-700 " />

      <div className="flex">
        <div className="w-1/5 relative m-5">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            onChange={handleYear}
            value={year}
          >
            <option value="" selected>
              select a Year
            </option>
            <option value="2022">2022-2023</option>
            <option value="2023">2023-2024</option>
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
            <option value="" selected>
              select a Sport
            </option>
            {sport.map((item, index) => (
              <option key={item._id} value={item._id}>
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
      <AgeGroupwiseCount
        selectedOption={selectedOption}
        year={year}
        sport={sportId}
      />
      <hr className="h-px bg-gray-700 " />
      <div className="flex m-5">
        <div className="flex m-5 space-x-3">
          <h1 className="text-xl font-semibold">From :</h1>
          <input type="date" value={fromdate} onChange={handledatechange} />
        </div>
        <div className="flex m-5 space-x-3">
          <h1 className="text-xl font-semibold">To :</h1>
          <input type="date" value={ToDate} onChange={handleToChange} />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <AttendanceAnalysis
        selectedOption={selectedOption}
        fromdate={fromdate}
        todate={ToDate}
      />
      <DistrictChart />
      {/* <GeneralAnalyis selectedOption={selectedOption} /> */}
    </div>
  );
};

export default AuthorityBarChartAnalysis;
