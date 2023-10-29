import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const SportsComplexDetails = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink
          to={"/manager/editsportscomplex"}
          className="flex justify-end mb-4"
        >
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Edit Complex Details
          </Button>
        </NavLink>
      </div>
      {/* <SupervisorDataTable /> */}
    </div>
  );
};

export default SportsComplexDetails;
