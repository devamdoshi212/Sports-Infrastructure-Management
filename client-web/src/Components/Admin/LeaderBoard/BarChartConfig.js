import React from "react";
import ReactApexChart from "react-apexcharts";

const generateChartConfig = (chartData, chartType) => {
  const {
    categories,
    solvednotsatisfied,
    solvedsatisfied,
    unsolved,
    sloved,
    totalComplaints,
  } = chartData;

  const options = {
    chart: {
      type: chartType, // Specify the chart type (bar in this case)
      height: "100%",
    },
    title: {
      text: "Complaint Analysis", // Replace with your desired title
      align: "center",
    },
    xaxis: {
      categories,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      opacity: 0.8,
    },
    markers: {
      size: 0,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  const series = [
    {
      name: "Total Complaint",
      data: totalComplaints,
    },
    {
      name: "Solved Complaint",
      data: sloved,
    },
    {
      name: "Unsloved Complaint",
      data: unsolved,
    },
    {
      name: "Sloved Complaint with Happy Response",
      data: solvedsatisfied,
    },
    {
      name: "Solved Complaint with unsatisfied",
      data: solvednotsatisfied,
    },
  ];

  return { options, series };
};

const BarChartConfig = ({ chartData, chartType }) => {
  const { options, series } = generateChartConfig(chartData, chartType);

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={series}
        type={chartType}
        height="350"
      />
    </div>
  );
};

export default BarChartConfig;
