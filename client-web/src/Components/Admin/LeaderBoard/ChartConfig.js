import React from "react";
import ReactApexChart from "react-apexcharts";

const generateChartConfig = (chartData) => {
  const { categories, seriesData } = chartData;

  const options = {
    chart: {
      type: "radar",
      height: "100%",
    },
    xaxis: {
      categories,
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: Array(categories.length).fill("#EDEDED"),
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
  };

  const series = [
    {
      name: "Series 1",
      data: seriesData,
    },
  ];

  return { options, series };
};

const ChartConfig = ({ chartData }) => {
  const { options, series } = generateChartConfig(chartData);

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        height="350"
      />
    </div>
  );
};

export default ChartConfig;
