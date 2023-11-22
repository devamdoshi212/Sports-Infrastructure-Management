import React, { useEffect, useState } from "react";
import TimewiseAnalysis from "../../Admin/Analysis/TimeSlotAnalysis";
import CapacityAnalysis from "../../Admin/Analysis/CapacityAnalysis";
import ComplaintAnalysis from "../../Admin/Analysis/ComplaintAnalysis";
import EnrollAnalysis from "../../Admin/Analysis/EnrollAnalysis";
import EnrollLineAnalysis from "../../Admin/Analysis/EnrollLineAnalysis";
import AgeGroupAnalysis from "../../Admin/Analysis/AgeGroupAnalysis";
import { useSelector } from "react-redux";

const ManagerAnalysis = () => {
  // const [data, setData] = useState([]);
  // const [district, setDistrict] = useState([]);
  const { SportComplexId } = useSelector((state) => state.user.user);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [min, setminAge] = useState(0);
  const [max, setmaxAge] = useState(100);

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  useEffect(() => {
    setSelectedOption(SportComplexId);
  }, [SportComplexId]);

  const handleTimeslotChange = (e) => {
    setTimeslot(e.target.value);
    setminAge(e.target.value.split("-")[0]);
    setmaxAge(e.target.value.split("-")[1]);
  };

  return (
    <div>
      <TimewiseAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 "/>
      <CapacityAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 "/>
      <ComplaintAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 "/>
      <EnrollAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 "/>
      <EnrollLineAnalysis selectedOption={selectedOption} />
      <hr className="h-px bg-gray-700 "/>
      
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
    </div>
  );
};

export default ManagerAnalysis;
