import React from "react";
import AllBlogs from "../Components/Admin/DataTable";
import { useEffect } from "react";
import { useState } from "react";

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

  return (
    <div className="m-5">
      {/* <AllBlogs /> */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Active Complaints</div>
          <div className="p-5 ">{visible && data.activecomplaints}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Solved Complaints</div>
          <div className="p-5 ">{visible && data.solvedComplaints}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Complexes</div>
          <div className="p-5 ">{visible && data.totalComplex}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Sports</div>
          <div className="p-5 ">{visible && data.totalSports}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Athlete</div>
          <div className="p-5 ">{visible && data.totalathlete}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Complaints</div>
          <div className="p-5 ">{visible && data.totalcomplaints}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Instructor</div>
          <div className="p-5 ">{visible && data.totalinstructer}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Manager</div>
          <div className="p-5 ">{visible && data.totalmanager}</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Supervisor</div>
          <div className="p-5 ">{visible && data.totalsupervisor}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
