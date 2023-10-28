import React from "react";
import AuthorityTable from "./AuthorityTable";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AllAuthority = () => {
  return (
    <div className="px-4">
      <div>
        <NavLink to={"/admin/addauthority"} className="flex justify-end mb-4">
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Authority
          </Button>
        </NavLink>
      </div>
      <AuthorityTable />
    </div>
  );
};

export default AllAuthority;
