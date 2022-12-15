import { useState } from "react";
import BarGraph from "../../Components/BarGraph/BarGraph";
import ChartControls from "../../Components/ChartControls/ChartConrols";
import NavBlock from "../../Components/NavBlock/NavBlock";
import PieGraph from "../../Components/PieGraph/PieGraph";
import LineGraph from "../../Components/LineGraph/LineGraph";
import "./Charts.scss";

const Charts = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
  updateLoggedInStatus,
}) => {
  const [selectedGraph, setSelectedGraph] = useState("pie");

  const updateSelectedGraph = (graphName) => {
    setSelectedGraph(graphName);
  };

  return (
    <div className="charts">
      <NavBlock updateLoggedInStatus={updateLoggedInStatus} />
      <div className="charts__content">
        {selectedGraph === "pie" && (
          <>
            <PieGraph
              transactionData={transactionData}
              transactionDates={transactionDates}
              updateTransactionDates={updateTransactionDates}
            />
          </>
        )}
        {selectedGraph === "bar" && (
          <>
            <BarGraph
              transactionData={transactionData}
              transactionDates={transactionDates}
              updateTransactionDates={updateTransactionDates}
            />
          </>
        )}
        {selectedGraph === "line" && (
          <>
            <LineGraph
              transactionData={transactionData}
              transactionDates={transactionDates}
              updateTransactionDates={updateTransactionDates}
            />
          </>
        )}
      </div>
      <ChartControls
        updateSelectedGraph={updateSelectedGraph}
        updateTransactionDates={updateTransactionDates}
      />
    </div>
  );
};

export default Charts;
