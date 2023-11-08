import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Utilization from "../Components/Manager/Analysis/Utilization";
const ManagerDashboard = () => {
  const [visibale, setvisible] = useState(false);
  const [Instructor, setDetailsInstrutor] = useState({});
  const [complaint, setcomplaint] = useState("");
  const [uncomplaint, unsetcomplaint] = useState("");
  const { SportComplexId } = useSelector((state) => state.user.user);
  const [remain, setRemain] = useState("");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/sportsComplexDetail?sportsComplex=${SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDetailsInstrutor(result);
        setvisible(true);
        // console.log(result);
      })
      .catch((error) => console.log("error", error));

    fetch(
      `http://localhost:9999/getAllComplaints?sportsComplex=${SportComplexId}&status=0`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setcomplaint(result.data.length))
      .catch((error) => console.log("error", error));
    fetch(
      `http://localhost:9999/getAllComplaints?sportsComplex=${SportComplexId}&status=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => unsetcomplaint(result.data.length))
      .catch((error) => console.log("error", error));
    fetch(
      `http://localhost:9999/getAllComplaints?sportsComplex=${SportComplexId}&level=1&status=0`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setRemain(result.data.length))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl ">Total Facilities</div>
          <div className="p-3 text-2xl ">
            {visibale && Instructor.availableSports.length}
          </div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300">
          <div className=" font-bold p-5 text-2xl ">Total Instructors</div>
          <div className="p-3 text-2xl">
            {visibale && Instructor.instructerData.length}
          </div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Atheltes</div>
          <div className="p-3 text-2xl">
            {visibale && Instructor.athleteCount}
          </div>
        </div>
        <div className="text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">
            Total Unsloved Complaints
          </div>
          <div className="p-3 text-2xl">{visibale && complaint}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Sloved Complaints</div>
          <div className="p-3 text-2xl">{visibale && uncomplaint}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Active Complaints</div>
          <div className="p-3 text-2xl ">{visibale && remain}</div>
        </div>
      </div>
      <Utilization />
    </div>
  );
};

export default ManagerDashboard;
