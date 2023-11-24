import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const EventAnalysis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Facility",
        data: [30, 41],
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
        categories: ["FootBall", "Cricket"],
      },
      yaxis: {
        title: {
          text: "Number of Athelte in Sport Complexes",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            color: "#263238",
          },
        },
      },
      colors: ["#3366FF"],
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Attendance in Sport Complexes",
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
    if (props.selectedOption !== "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:9999/attendanceSportWise?sportscomplex=${props.selectedOption}&from=${props.fromdate}&to=${props.todate}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const data = result.data;
          const categories = data.map((item) => item.sportName);
          const count = data.map((item) => item.totalCount);
          setChartData({
            ...chartData,
            series: [
              {
                name: "Facility",
                data: count,
              },
            ],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories: categories,
              },
            },
          });
        })
        .catch((error) => console.log("error", error));
    }
  }, [props.selectedOption, props.fromdate, props.todate]);

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

export default EventAnalysis;
