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
        console.log(result);
        setData(result);
        setVisible(true);
      })
      .catch((error) => console.log("error", error));
  }, [DistrictId]);

  const AnimatedCount = ({ finalCount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const animationDuration = 500;
      const steps = finalCount;
      const stepDuration = animationDuration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep <= steps) {
          setCount(currentStep);
          currentStep += 1;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [finalCount]);

    return <div className="p-3 text-2xl">{count}</div>;
  };
  return (
    <div className="m-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className=" h-48 p-3 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Atheltes</div>
          <AnimatedCount
            finalCount={
              visibale &&
              data.athleteCount.reduce(
                (sum, entry) => sum + entry.athleteCount,
                0
              )
            }
          />
        </div>
        <Link to={"allsportscomplex"}>
          <div className=" h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">Total Complexes</div>
            <AnimatedCount finalCount={visibale && data.sportComplexCount} />
          </div>
        </Link>
        <div className=" h-48 p-3 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Manager</div>
          <AnimatedCount finalCount={visibale && data.manager} />
        </div>
        <div className=" h-48 p-3 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Supervisor</div>
          <AnimatedCount finalCount={visibale && data.supervisor} />
        </div>
        <div className=" h-48 p-3 text-center rounded-lg bg-gray-300 ">
          <div className=" font-bold p-5 text-2xl">Total Instrucor</div>
          <AnimatedCount finalCount={visibale && data.instructor} />
        </div>
        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Complaints in Sport Complexes
            </div>
            <AnimatedCount
              finalCount={
                visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.unsolvedComplaint,
                  0
                ) +
                  data.complaintCount.reduce(
                    (sum, entry) => sum + entry.solvedComplaint,
                    0
                  )
              }
            />
          </div>
        </Link>

        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Solved Complaints
            </div>
            <AnimatedCount
              finalCount={
                visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.solvedComplaint,
                  0
                )
              }
            />
          </div>
        </Link>

        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Active Complaints
            </div>
            <AnimatedCount
              finalCount={
                visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.activeComlaintCount,
                  0
                )
              }
            />
          </div>
        </Link>
        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Unsolved Complaints in Sport Complexes
            </div>
            <AnimatedCount
              finalCount={
                visibale &&
                data.complaintCount.reduce(
                  (sum, entry) => sum + entry.unsolvedComplaint,
                  0
                )
              }
            />
          </div>
        </Link>
        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Solved Complains with Satisfied Response
            </div>
            <AnimatedCount finalCount={visibale && data.happy} />
          </div>
        </Link>
        <Link to={"allcomplaint"}>
          <div className="h-48 p-3 text-center rounded-lg bg-gray-300 ">
            <div className=" font-bold p-5 text-2xl">
              Total Solved Complains with Unsatisfied Response
            </div>
            <AnimatedCount finalCount={visibale && data.sad} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
