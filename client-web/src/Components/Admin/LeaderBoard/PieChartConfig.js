import React from "react";
import ReactApexChart from "react-apexcharts";

const generateChartConfig = (chartData) => {
  const { categories, seriesData } = chartData;

  const options = {
    chart: {
      type: "pie",
      height: "100%",
    },
    labels: categories, // Labels for each pie slice
    fill: {
      opacity: 0.8,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  const series = seriesData;

  return { options, series };
};

const PieChartConfig = ({ chartData }) => {
  const { options, series } = generateChartConfig(chartData);

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height="350"
      />
    </div>
  );
};

export default PieChartConfig;
