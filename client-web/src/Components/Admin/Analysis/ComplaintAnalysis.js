import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ComplaintAnalysis = (props) => {
  console.log("in", props.formdata);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sloved Complaint",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Unsloved Complaint",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Sloved With satisfied",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Sloved With unsatisfied",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Complaint",
          style: {
            fontSize: "12px",
            // fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          }, // Your Y-axis title
        },
      },
      colors: ["#66FF33", "#FF3366", "#33FFCC", "#FFCC33"],
      title: {
        text: "Complaint Analysis",
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
      `http://localhost:9999/ComplaintsAnalysis?sportsComplexId=${props.selectedOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const data = result.data;
        // console.log(data);
        const categories = data.map((s) => s.type);
        const sloved = data.map((s) => s.solved);
        const unsolved = data.map((s) => s.unsolved);
        const solvedsatisfied = data.map((s) => s.solvedsatisfied);
        const solvednotsatisfied = data.map((s) => s.solvednotsatisfied);

        setChartData({
          ...chartData,
          series: [
            {
              data: sloved,
            },
            {
              data: unsolved,
            },
            {
              data: solvedsatisfied,
            },
            {
              data: solvednotsatisfied,
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

export default ComplaintAnalysis;
