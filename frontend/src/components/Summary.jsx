import CardSummary from "./CardSummary";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUser } from "react-icons/fa";

const Summary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <CardSummary
          icon={<FaUser />}
          text="Total number of employess"
          number={15}
        />
        <CardSummary
          icon={<FaBuilding />}
          text="Total number of department"
          number={15}
        />
        <CardSummary
          icon={<FaUser />}
          text="Total number of employess"
          number={15}
        />
      </div>
      
    </div>
  );
};

export default Summary;
