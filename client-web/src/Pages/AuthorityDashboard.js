import React from "react";

const AuthorityDashboard = () => {
  return (
    <div className="m-5">
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

export default AuthorityDashboard;
