import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import ComplexDataTable from "./ComplexNewsDataTable";

const ComplexNews = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <NavLink to={"/manager/addcomplexevent"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complex News/Event
          </Button>
        </NavLink>
      </div>
      <ComplexDataTable />
    </div>
  );
};

export default ComplexNews;
