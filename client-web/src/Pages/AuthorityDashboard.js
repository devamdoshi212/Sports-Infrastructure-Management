import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuthorityDashboard = () => {
  const { DistrictId } = useSelector((state) => state.user.user);
  const [visibale, setVisible] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9999/AuthorityDetails?districtId=${DistrictId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setVisible(true);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-lg">Total Atheltes</div>
          <div className="p-5 ">
            {visibale &&
              data.athleteCount.reduce(
                (sum, entry) => sum + entry.athleteCount,
                0
              )}
          </div>
        </div>
        <Link to={"allsportscomplex"}>
          <div className="h-32 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-lg">Total Complexes</div>
            <div className="p-5 ">{visibale && data.sportComplexCount}</div>
          </div>
        </Link>

        <Link to={"allcomplaint"}>
          <div className="h-32 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-lg">
              Total Solved Complaints
            </div>
            <div className="p-5 ">
              {visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.solvedComplaint,
                  0
                )}
            </div>
          </div>
        </Link>

        <Link to={"allcomplaint"}>
          <div className="h-32 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-lg">
              Total Active Complaints
            </div>
            <div className="p-5 ">
              {visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.activeComplaint,
                  0
                )}
            </div>
          </div>
        </Link>
        <Link to={"allcomplaint"}>
          <div className="h-32 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-lg">
              Total Complaints in Sport Complexes
            </div>
            <div className="p-5 ">
              {visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.complaintCount,
                  0
                )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
