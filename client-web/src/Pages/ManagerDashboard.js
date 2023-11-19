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

  const AnimatedCount = ({ finalCount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const animationDuration = 500; // in milliseconds
      const steps = finalCount;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep <= steps) {
          setCount(currentStep);
          currentStep += 1;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [finalCount]);

    return <div className="p-3 text-2xl">{count}</div>;
  };
  // const AnimatedCount = ({ finalCount }) => {
  //   const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     setCount(finalCount); // Set the final count immediately to trigger the transition
  //   }, [finalCount]);

  //   return <div className="p-3 text-2xl count">{count}</div>;
  // };

  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl ">Total Facilities</div>
          <div className="p-3 text-2xl ">
            <AnimatedCount
              finalCount={visibale && Instructor.availableSports.length + 0}
            />{" "}
          </div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300">
          <div className=" font-bold p-5 text-2xl ">Total Instructors</div>
          <div className="p-3 text-2xl">
            <AnimatedCount
              finalCount={visibale && Instructor.instructerData.length + 0}
            />
          </div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Atheltes</div>
          <div className="p-3 text-2xl">
            <AnimatedCount
              finalCount={visibale && Instructor.athleteCount + 0}
            />{" "}
          </div>
        </div>
        <div className="text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">
            Total Unsloved Complaints
          </div>
          <AnimatedCount finalCount={visibale && complaint} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Sloved Complaints</div>
          <AnimatedCount finalCount={visibale && uncomplaint} />
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Active Complaints</div>
          <AnimatedCount finalCount={visibale && remain} />
        </div>
      </div>
      <Utilization />
    </div>
  );
};

export default ManagerDashboard;
