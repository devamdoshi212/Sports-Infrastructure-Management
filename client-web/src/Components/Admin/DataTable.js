import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
// import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
// import { Slider } from "primereact/slider";
// import { Tag } from "primereact/tag";
// import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import { Service } from "./Servies";
import { useCookies } from "react-cookie";

export default function DistrictWiseSportsComplex() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    // CustomerService.fetchblogs();
    Service.getCustomersXLarge().then((data) => {
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

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      Title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      Author_Name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      CreatedAt: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between mr-2">
        <Button
          type="button"
          // icon="pi pi-filter-slash"
          label="Clear"
          outlined
          className="px-4 py-2 rounded-lg text-blue-800 ring-0 border-2 border-blue-700 hover:bg-gray-200"
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          {/* <i className="pi pi-search" /> */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg> */}

          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  // Function to calculate the row index
  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1; // Assuming 10 rows per page
  };

  return (
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
        globalFilterFields={["district", "sportComplex"]}
        header={header}
        emptyMessage="No Blogs found."
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
          field="district"
          header="District"
          filterPlaceholder="Search by Title"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="sportComplex"
          header="No of SportComplex"
          filterPlaceholder="Search by Title"
          style={{ minWidth: "12rem" }}
        />
      </DataTable>
    </div>
  );
}
