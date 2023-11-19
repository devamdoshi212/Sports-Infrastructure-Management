import React, { useEffect, useState } from "react";
import LeaderboardDataTable from "./LeaderBoardDataTable";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(""); // Added state to track the selected option

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9999/getSports", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the selected option state
  };
  return (
    <div className="px-4">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
        onChange={handleOptionChange} // Add an onChange event handler
        value={selectedOption} // Set the value of the select element to the selectedOption state
      >
        <option value="">select Any One</option>

        {data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.SportName}
          </option>
        ))}
      </select>
      <div></div>
      <LeaderboardDataTable selectedOption={selectedOption} />
    </div>
  );
};

export default Leaderboard;
