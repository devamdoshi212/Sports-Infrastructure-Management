import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import InstructorDataTable from "./InstructorDataTable";

const AllInstructor = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink
          to={"/manager/addinstructor"}
          className="flex justify-end mb-4"
        >
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Instructor
          </Button>
        </NavLink>
      </div>
      <InstructorDataTable />
    </div>
  );
};

export default AllInstructor;
