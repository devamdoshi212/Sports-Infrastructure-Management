import React, { useEffect, useState } from "react";
import EnrollLineAnalysis from "../../Admin/Analysis/Line/EnrollLineAnalysis";
import EventAnalysis from "../../Admin/Analysis/Line/EventAnalysis";
import ComplaintLineAnalysis from "../../Admin/Analysis/Line/ComplaintLine";
import { useSelector } from "react-redux";

const ManagerLineChartAnalysis = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { SportComplexId } = useSelector((state) => state.user.user);

  useEffect(() => {
    setSelectedOption(SportComplexId);
  }, [SportComplexId]);

  return (
    <div>
      <EnrollLineAnalysis selectedOption={selectedOption} />
      <EventAnalysis selectedOption={selectedOption} />
      <ComplaintLineAnalysis selectedOption={selectedOption} />
    </div>
  );
};

export default ManagerLineChartAnalysis;
