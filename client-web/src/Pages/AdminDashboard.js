import React from "react";
import AllBlogs from "../Components/Admin/DataTable";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setdata] = useState({});
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9999/AdminViewDetails", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setdata(result);
        setvisible(true);
      })
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

    return <div className="font-bold p-3 text-4xl">{count}</div>;
  };
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* <Link to={"districtWiseSportsComplex"}> */}
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">Total Complexes</div>
          <AnimatedCount finalCount={visible && data.totalComplex} />
        </div>
        {/* </Link> */}
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold p-5 text-2xl">Total Sports</div>
          <AnimatedCount finalCount={visible && data.totalSports} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold p-5 text-2xl">Total Athlete</div>
          <AnimatedCount finalCount={visible && data.totalathlete} />
        </div>

        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold p-5 text-2xl">Total Instructor</div>
          <AnimatedCount finalCount={visible && data.totalinstructer} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold p-5 text-2xl">Total Manager</div>
          <AnimatedCount finalCount={visible && data.totalmanager} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold  p-5 text-2xl">Total Supervisor</div>
          <AnimatedCount finalCount={visible && data.totalsupervisor} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold  p-5 text-2xl">Total Complaints in Gujarat</div>
          <AnimatedCount finalCount={visible && data.totalcomplaints} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold  p-5 text-2xl">
            Total Unsolved Complaints in Gujarat
          </div>
          <AnimatedCount
            finalCount={visible && data.totalcomplaints - data.solvedComplaints}
          />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Solved Complaints in Gujarat
          </div>
          <AnimatedCount finalCount={visible && data.solvedComplaints} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold  p-5 text-2xl">Total Active Complaints(Admin)</div>
          <AnimatedCount finalCount={visible && data.activecomplaints} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className=" font-semibold p-5 text-2xl">
            Total Solved Complaints with Satisfied Response
          </div>
          <AnimatedCount finalCount={visible && data.satisfiedCount} />
        </div>
        <div className="h-44 text-center rounded-lg bg-gray-300 ">
          <div className="font-semibold p-5 text-2xl">
            Total Solved Complaint with Unsatisfied Response
          </div>
          <AnimatedCount finalCount={visible && data.unsatisfiedCount} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
