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
import { AuthorityService } from "./AuthorityService";
import { useCookies } from "react-cookie";

export default function AuthorityTable() {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  //   const representatives = useSelector((state) => state.Maincategory.category);
  const [cookies] = useCookies(["token"]);
  // console.log(representatives);

  // const [representatives] = useState([
  //   { name: "Amy Elsner", image: "amyelsner.png" },
  //   { name: "Anna Fali", image: "annafali.png" },
  //   { name: "Asiya Javayant", image: "asiyajavayant.png" },
  //   { name: "Bernardo Dominic", image: "bernardodominic.png" },
  //   { name: "Elwin Sharvill", image: "elwinsharvill.png" },
  //   { name: "Ioni Bowcher", image: "ionibowcher.png" },
  //   { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
  //   { name: "Onyama Limba", image: "onyamalimba.png" },
  //   { name: "Stephen Shaw", image: "stephenshaw.png" },
  //   { name: "XuXue Feng", image: "xuxuefeng.png" },
  // ]);

  // const [statuses] = useState([
  //   "unqualified",
  //   "qualified",
  //   "new",
  //   "negotiation",
  //   "renewal",
  // ]);

  // const getSeverity = (status) => {
  //   switch (status) {
  //     case "unqualified":
  //       return "danger";

  //     case "qualified":
  //       return "success";

  //     case "new":
  //       return "info";

  //     case "negotiation":
  //       return "warning";

  //     case "renewal":
  //       return null;
  //   }
  // };

  const DeleteHandler = (rowdata) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(co okies.token);
        var myHeaders = new Headers();
        myHeaders.append("token", cookies.token);
        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };
        fetch(`http://localhost:9999/deleteblog/${rowdata._id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            setdeleterefresh(!deleterefresh);
          })
          .catch((error) => console.log("error", error));
        console.log("Deleted !!");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    // CustomerService.fetchblogs();
    AuthorityService.getCustomersXLarge().then((data) => {
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

  // const formatDate = (value) => {
  //   return value.toLocaleDateString("en-US", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  // };

  // const formatCurrency = (value) => {
  //   return value.toLocaleString("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   });
  // };

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
      // balance: {
      //   operator: FilterOperator.AND,
      //   constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      // },
      // status: {
      //   operator: FilterOperator.OR,
      //   constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      // },
      // activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
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

  const countryBodyTemplate = (rowData) => {
    // console.log(rowData);
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt="flag"
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.Author_Name}`}
          style={{ width: "24px" }}
        />
        <span>{rowData.Author_Name}</span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      >
        Clear
      </Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      >
        Apply
      </Button>
    );
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  };

  const representativeFilterTemplate = (options) => {
    // Map options.value to create label and value options
    const mappedOptions = (options.value || []).map((category) => ({
      label: category.name,
      value: category.name,
    }));
    // console.log(options.filterCallback(e.value));

    return (
      <MultiSelect
        value={mappedOptions.map((option) => option.value)} // Use mapped options as values
        // options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
      />
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <img
          alt={option.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
          width="32"
        /> */}
        <span>{option.name}</span>
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

  // const balanceBodyTemplate = (rowData) => {
  //   return formatCurrency(rowData.balance);
  // };

  // const balanceFilterTemplate = (options) => {
  //   return (
  //     <InputNumber
  //       value={options.value}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       mode="currency"
  //       currency="USD"
  //       locale="en-US"
  //     />
  //   );
  // };

  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
  //   );
  // };

  // const statusFilterTemplate = (options) => {
  //   return (
  //     <Dropdown
  //       value={options.value}
  //       options={statuses}
  //       onChange={(e) => options.filterCallback(e.value, options.index)}
  //       itemTemplate={statusItemTemplate}
  //       placeholder="Select One"
  //       className="p-column-filter"
  //       showClear
  //     />
  //   );
  // };

  // const statusItemTemplate = (option) => {
  //   return <Tag value={option} severity={getSeverity(option)} />;
  // };

  // const activityBodyTemplate = (rowData) => {
  //   return (
  //     <ProgressBar
  //       value={rowData.activity}
  //       showValue={false}
  //       style={{ height: "6px" }}
  //     ></ProgressBar>
  //   );
  // };

  // const activityFilterTemplate = (options) => {
  //   return (
  //     <React.Fragment>
  //       <Slider
  //         value={options.value}
  //         onChange={(e) => options.filterCallback(e.value)}
  //         range
  //         className="m-3"
  //       ></Slider>
  //       <div className="flex align-items-center justify-content-between px-2">
  //         <span>{options.value ? options.value[0] : 0}</span>
  //         <span>{options.value ? options.value[1] : 100}</span>
  //       </div>
  //     </React.Fragment>
  //   );
  // };

  // const verifiedBodyTemplate = (rowData) => {
  //   return (
  //     <i
  //       className={classNames("pi", {
  //         "text-green-500 pi-check-circle": rowData.verified,
  //         "text-red-500 pi-times-circle": !rowData.verified,
  //       })}
  //     ></i>
  //   );
  // };

  // const verifiedFilterTemplate = (options) => {
  //   return (
  //     <div className="flex align-items-center gap-2">
  //       <label htmlFor="verified-filter" className="font-bold">
  //         Verified
  //       </label>
  //       <TriStateCheckbox
  //         inputId="verified-filter"
  //         value={options.value}
  //         onChange={(e) => options.filterCallback(e.value)}
  //       />
  //     </div>
  //   );
  // };
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-between">
        <Link to={"/admin/blogsedit"} state={{ data: rowData }}>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 p-1"
            // onClick={editHandler.bind(this, rowData)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </button>
        </Link>
        <button
          type="button"
          onClick={DeleteHandler.bind(this, rowData)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <svg
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  // Function to calculate the row index
  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1; // Assuming 10 rows per page
  };
  const representativeBodyTemplate = (rowData) => {
    return rowData.Category.join(", ");
  };
  const district = useSelector((state) => state.district.districts);
  const DistrictBodyTemplete = (rowdata) => {
    const data = district.find((c) => c._id === rowdata.DistrictId);
    return data.District;
    // console.log(data);
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
        globalFilterFields={["Title", "Author_Name", "Category"]}
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
          header="Name"
          field="Name"
          filterField="Name"
          style={{ minWidth: "12rem" }}
          //   body={countryBodyTemplate}
          filter
          //   filterFooter={filterFooterTemplate}
          //   filterPlaceholder="Search by Author_Name"
          //   filterClear={filterClearTemplate}
          //   filterApply={filterApplyTemplate}
        />
        <Column
          header="Contact Number"
          field="ContactNum"
          filterField="ContactNum"
          style={{ minWidth: "12rem" }}
          //   body={countryBodyTemplate}
          filter
          //   filterFooter={filterFooterTemplate}
          //   filterPlaceholder="Search by Author_Name"
          //   filterClear={filterClearTemplate}
          //   filterApply={filterApplyTemplate}
        />
        <Column
          header="Email"
          field="Email"
          filterField="Email"
          style={{ minWidth: "12rem" }}
          //   body={countryBodyTemplate}
          filter
          //   filterFooter={filterFooterTemplate}
          //   filterPlaceholder="Search by Author_Name"
          //   filterClear={filterClearTemplate}
          //   filterApply={filterApplyTemplate}
        />
        <Column
          header="District"
          field="District"
          filterField="District"
          style={{ minWidth: "12rem" }}
          body={DistrictBodyTemplete}
          filter
          //   filterFooter={filterFooterTemplate}
          //   filterPlaceholder="Search by Author_Name"
          //   filterClear={filterClearTemplate}
          //   filterApply={filterApplyTemplate}
        />
        {/* <Column
          header="Category"
          field="Category"
          filterField="representative"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          body={representativeBodyTemplate}
          filter
          filterElement={representativeFilterTemplate}
        />
        <Column
          header="CreatedAt"
          filterField="date"
          field="CreatedAt"
          dataType="date"
          style={{ minWidth: "10rem" }}
          body={dateBodyTemplate}
          filter
          filterElement={dateFilterTemplate}
        />
        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ textAlign: "center" }}
        /> */}
      </DataTable>
    </div>
  );
}
