import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";

import { AuthorityComplaintService } from "./ComplaintServices";

export default function AthorityComplaintDataTable() {
  const { DistrictId, _id } = useSelector((state) => state.user.user);
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
    AuthorityComplaintService.getCustomersXLarge(DistrictId).then((data) => {
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
  const resolveHandler = (rowdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      status: 1,
      userId: _id,
      remark: remarks[rowdata._id] || "",
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
        // console.log(result);
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

  const PassHandler = (rowdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      level: 3,
      remark: remarks[rowdata._id] || "",
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
        // console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Complaint Pass To Admin Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setdeleterefresh(!deleterefresh);
      })
      .catch((error) => console.log("error", error));
  };

  const RemarkBy = (rowData) => {
    if (rowData.level === 0) return `Supervisor ${rowData.userId.Name}`;
    if (rowData.level === 1) return `Manager ${rowData.userId.Name}`;
    if (rowData.level === 2) return `Authority ${rowData.userId.Name}`;
    else {
      return "";
    }
  };

  const remarksBodyTemplate = (rowData) => {
    if (rowData.remarks) {
      return rowData.remarks.map((item, index) => (
        <div key={index} className="border">
          <p className="font-bold">Remark by: {RemarkBy(item)}</p>
          <p>Remark: {item.remark}</p>
          <p>Date: {dateBodyTemplate(item)}</p>
        </div>
      ));
    } else {
      return "";
    }
  };

  const [remarks, setRemarks] = useState({});

  const actionBodyTemplate = (rowData) => {
    const rowRemark = remarks[rowData._id] || "";
    return (
      <>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={`remarks-${rowData._id}`}
          >
            Remarks
          </label>
          <input
            id={`remarks-${rowData._id}`}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={`remarks-${rowData._id}`}
            type="text"
            placeholder="Type here ..."
            value={rowRemark}
            onChange={(e) => {
              setRemarks((prevRemarks) => ({
                ...prevRemarks,
                [rowData._id]: e.target.value,
              }));
            }}
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
          <button
            type="button"
            onClick={() => PassHandler(rowData)}
            className="text-white font-bold rounded-lg bg-red-700 hover:bg-red-500 hover:text-gray-200 p-2"
          >
            Forward
            {/* Your SVG icon for deleting */}
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
    setModalImages(rowdata.photo);
    setSelectedRowData(rowdata);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImages([]);
    setSelectedRowData(null);
    setIsModalOpen(false);
  };

  const nameBodyTemplate = (data) => {
    if (data.userId.Role === 0)
      return <div>{data.userId.Name + " (Athelte)"}</div>;
    if (data.userId.Role === 1)
      return <div>{data.userId.Name + " (Supervisor)"}</div>;
    if (data.userId.Role === 2)
      return <div>{data.userId.Name + " (Instructor)"}</div>;
    if (data.userId.Role === 3)
      return <div>{data.userId.Name + " (Manager)"}</div>;
    if (data.userId.Role === 4)
      return <div>{data.userId.Name + " (Authority)"}</div>;
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
                src={` http://localhost:9999/complaints/${modalImages}`}
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
            header="Complaint Raised By"
            // field="userId.Name"
            // filterField="Name"
            style={{ minWidth: "8rem" }}
            body={nameBodyTemplate}
          />
          <Column
            header="Complex Name"
            field="sportsComplex.name"
            filterField="name"
            style={{ minWidth: "10rem" }}
          />
          <Column
            header="Description"
            field="Description"
            filterField="Category"
            style={{ minWidth: "10rem" }}
          />
          <Column header="Remarks" body={remarksBodyTemplate} />
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
            header="Complaint Type"
            field="type.Type"
            filterField="type.Type"
            style={{ minWidth: "10rem" }}
          />
          <Column header="Action" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}

//
