import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import ComplaintDataTable from "./ComplaintDataTable";
const ComplaintDetails = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <NavLink to={"/manager/addcomplaint"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complaint
          </Button>
        </NavLink>
      </div>
      <ComplaintDataTable />
    </div>
  );
};

export default ComplaintDetails;
