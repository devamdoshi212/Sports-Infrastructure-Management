import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Utilization = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Student",
        data: [30, 20, 10, 21],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true, // Enable data labels
        offsetY: -10, // Adjust the vertical position of labels
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"], // Text color
        },
      },
      // dataLabels: {
      //   enabled: false,
      // },
      xaxis: {
        categories: ["Cricket", "VollyBall", "BasketBall", "BadMinton"],
      },
      yaxis: {
        title: {
          text: "Number of Athelets",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#FF5733"],
      title: {
        text: "Utilization in Sports",
        align: "center",
        margin: 50,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "26px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  //   useEffect(() => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };

  //     fetch(`http://localhost:9999/atheleteInSportsComplex`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         const data = result.data;
  //         console.log(data);
  //         const categories = data.map((s) => s.sportsComplexId);
  //         const seriesData = data.map((s) => s.userCount);

  //         setChartData({
  //           ...chartData,
  //           series: [
  //             {
  //               data: seriesData,
  //             },
  //           ],
  //           options: {
  //             ...chartData.options,
  //             xaxis: {
  //               ...chartData.options.xaxis,
  //               categories: categories,
  //             },
  //           },
  //         });
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, []);

  return (
    <div className="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default Utilization;