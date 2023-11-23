import React, { useState } from "react";
import BarChartAnalysis from "./BarChartAnalysis";
import LineChartAnalysis from "./LineChartAnalysis";

const Analysis = () => {
  const [chart, setChart] = useState("1");

  const handleChartType = (e) => {
    setChart(e.target.value);
  };

  return (
    <div>
      <div className="w-1/5 relative m-5">
        <select
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
          onChange={handleChartType}
          value={chart}
        >
          <option value="1" defaultValue="1">
            Bar chart
          </option>
          <option value="2">Line chart</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 14.293a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586 5.707 8.293a1 1 0 1 0-1.414 1.414l5 5z" />
          </svg>
        </div>
      </div>
      {chart === "1" ? <BarChartAnalysis /> : ""}
      {chart === "2" ? <LineChartAnalysis /> : ""}
    </div>
  );
};

export default Analysis;
