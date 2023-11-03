import React from "react";
import AdminComplaintDataTable from "./ComplaintDetails";
const AdminComplaint = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        {/* <NavLink to={"/manager/editfacility"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complaint
          </Button>
        </NavLink> */}
      </div>
      <AdminComplaintDataTable />
    </div>
  );
};

export default AdminComplaint;
