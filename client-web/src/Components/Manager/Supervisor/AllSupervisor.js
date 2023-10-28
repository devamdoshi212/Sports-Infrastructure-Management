import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import SupervisorDataTable from "./SupervisorDataTable";

const AllSupervisor = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink
          to={"/manager/addsupervisor"}
          className="flex justify-end mb-4"
        >
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Supervisor
          </Button>
        </NavLink>
      </div>
      <SupervisorDataTable />
    </div>
  );
};

export default AllSupervisor;
