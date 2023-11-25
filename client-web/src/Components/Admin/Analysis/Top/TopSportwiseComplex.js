import React, { useEffect, useState } from "react";

const TopSportwiseComplex = ({ districtId, sportId }) => {
  const [sportComplexes, setSportComplexes] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/sportRatingWiseTop5?sportId=${sportId}&district=${districtId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSportComplexes(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [districtId, sportId]);

  return (
    <>
      <h2 className="text-center text-2xl font-bold m-2">
        Top 5 Sport Complex in selected Sport{" "}
      </h2>
      <table className="w-11/12 m-auto bg-white border border-gray-300 my-4 p-datatable">
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
              <td className="py-2 px-4 border-b">{complex.sports.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TopSportwiseComplex;
