import React, { useState } from "react";
import AdminComplaintDataTable from "./ComplaintDetails";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AdminComplaint = () => {
  const [Complaint, setComplaint] = useState("0");
  const [fromdate, setFromDate] = useState("");
  const [error, setError] = useState("");
  const [ToDate, setTodate] = useState("");

  const ComplaintHandler = (e) => {
    setComplaint(e.target.value);
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
    <div className="px-4">
      <div className="flex justify-end mb-4">
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
        <div className="w-1/5 relative m-5">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            onChange={ComplaintHandler}
            value={Complaint}
          >
            <option value="0" selected>
              Pending Complaint
            </option>
            <option value="1">Solved Complaint</option>
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

        <NavLink to={"/admin/addcomplianttype"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complaint Type
          </Button>
        </NavLink>
      </div>
      <AdminComplaintDataTable
        type={Complaint}
        todate={ToDate}
        fromdate={fromdate}
      />
    </div>
  );
};

export default AdminComplaint;
