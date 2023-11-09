import React from "react";
import AdminComplaintDataTable from "./ComplaintDetails";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const AdminComplaint = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <NavLink to={"/admin/addcomplianttype"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complaint Type
          </Button>
        </NavLink>
      </div>
      <AdminComplaintDataTable />
    </div>
  );
};

export default AdminComplaint;
