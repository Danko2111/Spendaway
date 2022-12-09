import ChartControls from "../../Components/ChartControls/ChartConrols";
import NavBlock from "../../Components/NavBlock/NavBlock";
import PieGraph from "../../Components/PieGraph/PieGraph";
import "./Charts.scss";

const Charts = ({ transactionData, transactionDates }) => {
  return (
    <div className="charts">
      <NavBlock />
      <div className="charts__content">
        <div className="charts__main">
          <PieGraph
            transactionData={transactionData}
            transactionDates={transactionDates}
          />
          <div className="charts_graph-info"></div>
        </div>
        <ChartControls />
      </div>
    </div>
  );
};

export default Charts;
