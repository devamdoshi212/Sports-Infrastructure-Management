import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import MangerDataTable from "./MangerDataTable";

const AllManager = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink to={"/authority/addmanager"} className="flex justify-end mb-4">
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Manager
          </Button>
        </NavLink>
      </div>
      <MangerDataTable />
    </div>
  );
};

export default AllManager;
