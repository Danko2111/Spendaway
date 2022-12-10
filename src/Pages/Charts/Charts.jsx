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
}) => {
  const [selectedGraph, setSelectedGraph] = useState("pie");

  const updateSelectedGraph = (graphName) => {
    setSelectedGraph(graphName);
  };

  return (
    <div className="charts">
      <NavBlock />
      <div className="charts__content">
        <div className="charts__main">
          {selectedGraph === "pie" && (
            <>
              <PieGraph
                transactionData={transactionData}
                transactionDates={transactionDates}
                updateTransactionDates={updateTransactionDates}
              />
              <div className="charts_graph-info"></div>
            </>
          )}
          {selectedGraph === "bar" && (
            <>
              <BarGraph
                transactionData={transactionData}
                transactionDates={transactionDates}
                updateTransactionDates={updateTransactionDates}
              />
              <div className="charts_graph-info"></div>
            </>
          )}
          {selectedGraph === "line" && (
            <>
              <LineGraph
                transactionData={transactionData}
                transactionDates={transactionDates}
                updateTransactionDates={updateTransactionDates}
              />
              <div className="charts_graph-info"></div>
            </>
          )}
        </div>
        <ChartControls
          updateSelectedGraph={updateSelectedGraph}
          updateTransactionDates={updateTransactionDates}
        />
      </div>
    </div>
  );
};

export default Charts;
