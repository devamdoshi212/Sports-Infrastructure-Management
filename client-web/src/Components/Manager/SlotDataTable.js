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
import { useRef } from "react";
import { SlotServices } from "./SlotTableServices";
export default function SlotDataTable() {
  const { _id } = useSelector((state) => state.user.user);
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    SportName: "",
    Category: "",
  });

  //   const DeleteHandler = (rowdata) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, Delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         var myHeaders = new Headers();
  //         myHeaders.append("token", cookies.token);
  //         var requestOptions = {
  //           method: "DELETE",
  //           headers: myHeaders,
  //           redirect: "follow",
  //         };
  //         fetch(`http://localhost:9999/deleteblog/${rowdata._id}`, requestOptions)
  //           .then((response) => response.text())
  //           .then((result) => {
  //             setdeleterefresh(!deleterefresh);
  //           })
  //           .catch((error) => console.log("error", error));
  //         console.log("Deleted !!");
  //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       }
  //     });
  //   };

  useEffect(() => {
    SlotServices.getCustomersXLarge(_id).then((data) => {
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
    const date = new Date(rowData.createdAt);
    return formatDate(date);
  };
  const dateBodyupdatweTemplate = (rowData) => {
    const date = new Date(rowData.updatedAt);
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

  //   const actionBodyTemplate = (rowData) => {
  //     return (
  //       <div className="flex justify-between">
  //         <Link to={"/admin/blogsedit"} state={{ data: rowData }}>
  //           <button
  //             type="button"
  //             className="text-blue-500 hover:text-blue-700 p-1"
  //           >
  //             {/* Your SVG icon for editing */}
  //           </button>
  //         </Link>
  //         <button
  //           type="button"
  //           onClick={() => DeleteHandler(rowData)}
  //           className="text-red-500 hover:text-red-700 p-1"
  //         >
  //           {/* Your SVG icon for deleting */}
  //         </button>
  //       </div>
  //     );
  //   };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const modalOverlayRef = useRef(null);

  const openModal = (rowdata) => {
    setModalImages(rowdata.images);
    setSelectedRowData(rowdata);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImages([]);
    setSelectedRowData(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalOverlayRef.current &&
        !modalOverlayRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div>
      {isModalOpen && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center modal-overlay bg-gray-900 bg-opacity-80"
        >
          <div className="modal-above-screen bg-white rounded-lg p-4 relative">
            <span
              className="close absolute top-2 right-2 text-3xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <div className="modal-body p-4 flex justify-center items-center">
              {modalImages.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt="Sport Facility Pic"
                  className="w-40 h-40 object-cover mx-2"
                />
              ))}
            </div>
          </div>
        </div>
      )}
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
            header="Name"
            field="Name"
            filterField="Name"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Email"
            field="Email"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Contact Number"
            field="ContactNum"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Days "
            field="duration"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Start Date"
            field="createdAt"
            filterField="Category"
            body={(e) => {
              return dateBodyTemplate(e);
            }}
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="End Date"
            field="updatedAt"
            filterField="Category"
            body={(e) => {
              return dateBodyupdatweTemplate(e);
            }}
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="SportComplex"
            field="SportComplexId.name"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="Facility"
            field="sport.SportName"
            filterField="Category"
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
