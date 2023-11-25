import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const EventAnalysis = (props) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Events",
        data: [30, 40, 35, 50, 49, 60, 10, 12],
      },
    ],
    options: {
      chart: {
        type: "line",
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
          "7 to 9 AM",
          "9 to 11 AM",
          "11 to 1 PM",
          "1 to 3 PM ",
          "3 to 5 PM",
          "5 to 7 PM",
          "7 to 12 PM",
          "12 to 7 AM",
        ],
      },
      yaxis: {
        title: {
          text: "Number of Events in Sport Complexes",
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
        text: "Events in Sport Complexes",
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
      `http://localhost:9999/monthWiseEventCount?sportsComplexId=${props.selectedOption}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result.data;
        // const monthNames = [
        //   "January",
        //   "February",
        //   "March",
        //   "April",
        //   "May",
        //   "June",
        //   "July",
        //   "August",
        //   "September",
        //   "October",
        //   "November",
        //   "December",
        // ];
        // const categories = data.map((item) => monthNames[item._id.month - 1]);
        const monthMapping = {};
        for (let i = 1; i <= 12; i++) {
          monthMapping[i] = 0;
        }

        // Populate totalAthelete values from the result data into the monthMapping
        result.data.forEach((entry) => {
          const monthNumber = entry._id.month;
          monthMapping[monthNumber] = entry.totalAthelete;
        });

        // Map the month names and totalAthelete values from the monthMapping
        const monthNames = Object.keys(monthMapping).map((monthNumber) => {
          const monthName = new Intl.DateTimeFormat("en-US", {
            month: "long",
          }).format(new Date(2023, monthNumber - 1, 1));
          return monthName;
        });

        const mappedData = Object.values(monthMapping);

        // const events = data.map((item) => item.totalAthelete);
        const colors = mappedData.map((value) => {
          // You can customize the color range based on your requirements
          if (value < 30) {
            return "#3366FF"; // Blue
          } else if (value < 50) {
            return "#FFD700"; // Gold
          } else {
            return "#FF6347"; // Tomato
          }
        });
        setChartData({
          ...chartData,
          series: [
            {
              name: "Events",
              data: mappedData,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: monthNames,
            },
            colors: colors,
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
        type="line"
        height={chartData.options.chart.height}
      />
    </div>
  );
};

export default EventAnalysis;
