import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AdminComplaintService } from "./ComplaintServices";

export default function AdminComplaintDataTable() {
  const { _id } = useSelector((state) => state.user.user);
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    SportName: "",
    Category: "",
  });
  const [remark, setremarks] = useState("");
  useEffect(() => {
    AdminComplaintService.getCustomersXLarge().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [deleterefresh]);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    // Update the global filter value for all fields
    setGlobalFilterValues({
      SportName: value,
      Category: value,
    });

    setFilters(_filters);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    // Set the global filter values for all fields to empty strings
    setGlobalFilterValues({
      Name: "",
      ContactNum: "",
      Email: "",
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between mr-2">
        <Button
          type="button"
          label="Clear"
          outlined
          className="px-4 py-2 rounded-lg text-blue-800 ring-0 border-2 border-blue-700 hover:bg-gray-200"
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <InputText
            value={globalFilterValues.Name}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
          />
        </span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    const date = new Date(rowData.CreatedAt);
    return formatDate(date);
  };

  const formatDate = (value) => {
    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const resolveHandler = (rowdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: 1,
      remark: remark,
      userId: _id,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/updateComplaint/${rowdata._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Complaint Sloved Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(!deleterefresh);
      })
      .catch((error) => console.log("error", error));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="remarks"
          >
            Remarks
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="remarks"
            type="text"
            placeholder="Type here ..."
            value={remark}
            onChange={(e) => {
              setremarks(e.target.value);
            }}
            // onBlur={handleBlur}
          />
        </div>
        <div className="flex justify-between space-x-1">
          <button
            type="button"
            className="text-white font-bold rounded-lg bg-blue-700 hover:bg-blue-500 hover:text-gray-200 p-2"
            onClick={() => resolveHandler(rowData)}
          >
            Resolve
            {/* Your SVG icon for editing */}
          </button>
          {/* <button
          type="button"
          onClick={() => PassHandler(rowData)}
          className="text-white font-bold rounded-lg bg-red-700 hover:bg-red-500 hover:text-gray-200 p-2"
        >
          Forward
          Your SVG icon for deleting
        </button> */}
        </div>
      </>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };

  return (
    <div>
      <div className="card">
        <DataTable
          value={customers}
          paginator
          showGridlines
          stripedRows
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          loading={loading}
          dataKey="_id"
          filters={filters}
          globalFilterFields={["sport.SportName", "sport.Category", "fees"]}
          header={header}
          emptyMessage="No Data found."
        >
          <Column
            field="index"
            header="Index"
            style={{ width: "4rem" }}
            body={(rowData) => {
              const rowIndex = customers.indexOf(rowData);
              return calculateIndex(Math.floor(first / 10), rowIndex);
            }}
          />

          <Column
            header="Complaint Raised By"
            field="userId.Name"
            filterField="Name"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Description"
            field="Description"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Image"
            field="photo"
            filterField="photo"
            body={(rowdata) => {
              console.log(rowdata);
              return (
                <img
                  className="w-full h-96"
                  src={`http://localhost:9999/complaints/${rowdata.photo}`}
                  alt="Sport Facility Pic"
                />
              );
            }}
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Complaint Type"
            field="type.Type"
            filterField="type.Type"
            style={{ minWidth: "12rem" }}
          />
          <Column header="Action" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
