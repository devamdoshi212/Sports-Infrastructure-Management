import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TimewiseAnalysis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Athelte",
        data: [30, 40, 35, 50, 49, 60, 10, 12],
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
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          colors: ["#000"],
        },
      },
      xaxis: {
        categories: [
          "7 to 8 AM",
          "8 to 9 AM",
          "9 to 10 PM",
          "10 to 11 PM ",
          "11 to 12 PM",
          "12 to 1 PM",
          "1 to 2 PM",
          "2 to 3 AM",
          "3 to 4 AM",
          "4 to 5 AM",
          "5 to 6 AM",
          "6 to 7 AM",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Athelte in Sport Complexes",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#3366FF"],
      title: {
        text: "Time slot wise Athelte in Sport Complex",
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

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/timeSlotUtilization?sportsComplexId=${props.selectedOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setChartData({
          ...chartData,
          series: [
            {
              data: result.slotcount,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
            },
          },
        });
      })
      .catch((error) => console.log("error", error));
  }, [props.selectedOption]);

  return (
    <div className="chart m-8">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default TimewiseAnalysis;
