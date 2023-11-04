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
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Complexes</div>
          <div className="p-5 text-2xl">{visible && data.totalComplex}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Sports</div>
          <div className="p-5 text-2xl">{visible && data.totalSports}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Athlete</div>
          <div className="p-5 text-2xl">{visible && data.totalathlete}</div>
        </div>

        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Instructor</div>
          <div className="p-5 text-2xl">{visible && data.totalinstructer}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Manager</div>
          <div className="p-5 text-2xl">{visible && data.totalmanager}</div>
        </div>
        <div className="text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Supervisor</div>
          <div className="p-5 text-2xl">{visible && data.totalsupervisor}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Complaints</div>
          <div className="p-5 text-2xl">{visible && data.totalcomplaints}</div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Active Complaints</div>
          <div className="p-5 text-2xl ">
            {visible && data.activecomplaints}
          </div>
        </div>
        <div className=" text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-3xl">Total Solved Complaints</div>
          <div className="p-5 text-2xl">{visible && data.solvedComplaints}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
