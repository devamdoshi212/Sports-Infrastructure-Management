import React, { useEffect, useState } from "react";

const SportComplexTable = ({ districtId }) => {
  const [sportComplexes, setSportComplexes] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:9999/rating?district=${districtId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setSportComplexes(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [districtId]);

  return (
    <>
      <h2 className="text-center text-2xl m-2 font-bold">
        Top 5 Sport Complex
      </h2>
      <table className="w-11/12 m-auto bg-white border border-gray-300 p-datatable ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sportComplexes.map((complex) => (
            <tr key={complex.id}>
              <td className="py-2 px-4 border-b">{complex.name}</td>
              <td className="py-2 px-4 border-b text-blue-400">
                <a href={complex.location} target="_blank" rel="noreferrer">
                  Sport complex Location
                </a>
              </td>
              <td className="py-2 px-4 border-b">
                {complex.averageRating ? complex.averageRating.toFixed(2) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SportComplexTable;
