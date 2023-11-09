import React from "react";
import AuthorityTable from "../Authority/AuthorityTable";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import SportComplexTable from "./SportsComplexTable";

const AllSportsComplex = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        {/* <NavLink
          to={"/admin/addsportscomplex"}
          className="flex justify-end mb-4"
        > */}
        <Button
          onClick={() => {
            navigate("/admin/addsportscomplex");
          }}
          className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl "
        >
          Add Sports Complex
        </Button>
        {/* </NavLink> */}
      </div>
      <SportComplexTable />
    </div>
  );
};

export default AllSportsComplex;
