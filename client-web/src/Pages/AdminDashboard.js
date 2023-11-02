import React from "react";
import AllBlogs from "../Components/Admin/DataTable";

const AdminDashboard = () => {
  return (
    <div className="m-5">
      <AllBlogs />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Sports</div>
          <div className="p-5 ">count</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Complex</div>
          <div className="p-5 ">count</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Facilities</div>
          <div className="p-5 ">count</div>
        </div>
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Player</div>
          <div className="p-5 ">count</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
