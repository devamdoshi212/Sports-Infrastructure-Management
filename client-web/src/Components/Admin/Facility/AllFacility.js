import React from "react";
import AuthorityTable from "../Authority/AuthorityTable";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AllFacility = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink to={"/admin/addfacility"} className="flex justify-end mb-4">
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Facility
          </Button>
        </NavLink>
      </div>
      <AuthorityTable />
    </div>
  );
};

export default AllFacility;
