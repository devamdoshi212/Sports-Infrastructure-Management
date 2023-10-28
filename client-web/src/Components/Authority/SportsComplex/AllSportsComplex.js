import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import SportComplexDataTable from "./SportsComplexDataTable";

const AllAuthoritySportsComplex = () => {
  return (
    <div className="px-4">
      <SportComplexDataTable />
    </div>
  );
};

export default AllAuthoritySportsComplex;
