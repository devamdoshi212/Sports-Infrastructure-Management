import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";
import { NewsServices } from "./NewsServices";
import { useRef } from "react";

export default function NewsDataTable() {
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
    NewsServices.getCustomersXLarge().then((data) => {
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
    const date = new Date(rowData.date);
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
  const PassHandler = (rowdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      active: 0,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9999/updateUpdates/${rowdata._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event InActive Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(!deleterefresh);
      })
      .catch((error) => console.log("error", error));
  };
  const resolveHandler = (rowdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      active: 1,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9999/updateUpdates/${rowdata._id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Event Active Successfully",
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
        <div className="flex justify-between space-x-1">
          <button
            type="button"
            className="text-white font-bold rounded-lg bg-blue-700 hover:bg-blue-500 hover:text-gray-200 p-2"
            onClick={() => resolveHandler(rowData)}
          >
            Active
            {/* Your SVG icon for editing */}
          </button>
          <button
            type="button"
            onClick={() => PassHandler(rowData)}
            className="text-white font-bold rounded-lg bg-red-700 hover:bg-red-500 hover:text-gray-200 p-2"
          >
            InActive
          </button>
        </div>
      </>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const modalOverlayRef = useRef(null);

  const openModal = (rowdata) => {
    setModalImages(rowdata.image);
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
              <img
                key=""
                src={modalImages}
                alt="Sport Facility Pic"
                className="w-60 h-60 object-cover mx-2"
              />
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
            header="Title"
            field="title"
            filterField="Name"
            style={{ minWidth: "10rem" }}
          />
          <Column
            header="Description"
            field="description"
            filterField="Name"
            style={{ minWidth: "10rem" }}
          />
          <Column
            header="Image"
            field="photo"
            filterField="photo"
            style={{ minWidth: "10rem" }}
            body={(rowdata) => (
              <button
                onClick={() => openModal(rowdata)}
                className="text-blue-900 hover:underline hover:decoration-black "
              >
                View Images
              </button>
            )}
          />

          <Column
            header="Status"
            field="active"
            body={(rowdata) => {
              if (rowdata.active === "1") {
                return (
                  <h2 className=" bg-green-700 text-white font-semibold rounded-md text-center p-2">
                    Active
                  </h2>
                );
              } else {
                return (
                  <h2 className=" bg-red-400 text-white font-semibold rounded-md text-center p-2">
                    InActive
                  </h2>
                );
              }
            }}
            style={{ maxWidth: "8rem" }}
          />
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ maxWidth: "10rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
}
