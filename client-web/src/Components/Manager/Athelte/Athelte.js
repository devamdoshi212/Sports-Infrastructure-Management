import React from "react";
import AthelteDataTable from "./AthelteDataTable";
const Athelte = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        {/* <NavLink to={"/manager/editfacility"}>
          <Button className="items-end cta-btn font-semibold py-4 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl ">
            Add Complaint
          </Button>
        </NavLink> */}
      </div>
      <AthelteDataTable />
    </div>
  );
};

export default Athelte;
