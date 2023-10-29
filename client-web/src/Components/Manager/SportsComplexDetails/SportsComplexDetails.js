import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import FacilityDataTable from "./FacilityDataTable";
const SportsComplexDetails = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <NavLink to={"/manager/editfacility"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Facility Details
          </Button>
        </NavLink>
      </div>
      <FacilityDataTable />
    </div>
  );
};

export default SportsComplexDetails;
