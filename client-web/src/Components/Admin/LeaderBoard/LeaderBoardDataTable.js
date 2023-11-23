import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import { LeaderboardServices } from "./LeaderboardServices";
import ChartConfig from "./ChartConfig";
import BarChartConfig from "./BarChartConfig";

export default function LeaderboardDataTable({ selectedOption }) {
  const [deleterefresh, setdeleterefresh] = useState(true);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValues, setGlobalFilterValues] = useState({
    SportName: "",
    Category: "",
  });
  console.log(selectedOption);
  useEffect(() => {
    LeaderboardServices.getCustomersXLarge(selectedOption).then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
    initFilters();
  }, [selectedOption]);

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
    const date = new Date(rowData.dob);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-between">
        <Link to={"/admin/blogsedit"} state={{ data: rowData }}>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 p-1"
          >
            {/* Your SVG icon for editing */}
          </button>
        </Link>
        <button
          type="button"
          //   onClick={() => DeleteHandler(rowData)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          {/* Your SVG icon for deleting */}
        </button>
      </div>
    );
  };

  const header = renderHeader();
  const [first, setFirst] = useState(0);

  const calculateIndex = (currentPage, rowIndex) => {
    return currentPage * 10 + rowIndex + 1;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const chartData = {
    categories: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    seriesData: [80, 50, 30, 40, 60],
  };

  const handleChartClick = (rowData) => {
    if (selectedOption !== "") {
      const categories = Object.keys(rowData.parameter);
      const seriesData = Object.values(rowData.parameter);
      setSelectedAthlete({
        chartData: {
          categories,
          seriesData,
        },
      });
    } else {
      // console.log(rowData);
      const categories = rowData.complaint.map((s) => s.type);
      const sloved = rowData.complaint.map((s) => s.solved);
      const unsolved = rowData.complaint.map((s) => s.unsolved);
      const solvedsatisfied = rowData.complaint.map((s) => s.solvedsatisfied);
      const solvednotsatisfied = rowData.complaint.map(
        (s) => s.solvednotsatisfied
      );
      setSelectedAthlete({
        chartData: {
          categories,
          sloved,
          unsolved,
          solvedsatisfied,
          solvednotsatisfied,
        },
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        globalFilterFields={["SportName", "Category"]}
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
          header="Athelte Name"
          field="name"
          filterField="name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Rating"
          field="rating"
          filterField="rating"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Profile"
          field="image"
          filterField="image"
          body={(rowdata) => {
            return (
              <img
                className="w-full h-56"
                src={`http://localhost:9999/${rowdata.image.slice(1)}`}
                alt="Sport Facility Pic"
              />
            );
          }}
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Email"
          field="email"
          filterField="email"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Number"
          field="contact"
          filterField="contact"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte DOB"
          field="dob"
          filterField="dob"
          body={(rowData) => {
            return <h2>{dateBodyTemplate(rowData)}</h2>;
          }}
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Athelte Address"
          field="address"
          filterField="address"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Analysis"
          body={(rowData) => (
            <button
              onClick={() => handleChartClick(rowData)}
              className="text-blue-500 hover:text-blue-800"
            >
              View
            </button>
          )}
        />
      </DataTable>
      {isModalOpen && selectedAthlete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
            {selectedOption === "" ? (
              <BarChartConfig
                chartType="bar"
                chartData={selectedAthlete.chartData}
              />
            ) : (
              <ChartConfig chartData={selectedAthlete.chartData} />
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* <Column
          header="Athelte Address"
          field="address"
          filterField="address"
          body={(rawdata) => {
            const chartData = {
              series: [
                {
                  name: "Series 1",
                  data: [80, 50, 30, 40, 60],
                },
              ],
              options: {
                chart: {
                  type: "radar",
                  height: "100%",
                },
                xaxis: {
                  categories: [
                    "Category 1",
                    "Category 2",
                    "Category 3",
                    "Category 4",
                    "Category 5",
                  ],
                },
                plotOptions: {
                  radar: {
                    polygons: {
                      strokeColors: [
                        "#EDEDED",
                        "#EDEDED",
                        "#EDEDED",
                        "#EDEDED",
                        "#EDEDED",
                      ],
                      connectorColors: "#EDEDED",
                    },
                  },
                },
                fill: {
                  opacity: 0.4,
                },
                markers: {
                  size: 0,
                },
                legend: {
                  position: "bottom",
                  horizontalAlign: "center",
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: "100%",
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              },
            };

            return (
              <div className="chart">
                <ReactApexChart
                  options={chartData.options}
                  series={chartData.series}
                  type="radar"
                  height="350"
                />
              </div>
            );
          }}

        /> */
