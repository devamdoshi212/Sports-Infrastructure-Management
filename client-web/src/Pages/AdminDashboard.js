import React from "react";
import AllBlogs from "../Components/Admin/DataTable";

const AdminDashboard = () => {
  return (
    <div className="m-5">
      <AllBlogs />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg bg-gray-400"></div>
        <div className="h-32 rounded-lg bg-gray-400"></div>
        <div className="h-32 rounded-lg bg-gray-400"></div>
        <div className="h-32 rounded-lg bg-gray-400"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
