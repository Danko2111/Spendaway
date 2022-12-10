import "./ChartControls.scss";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

const ChartControls = ({ updateSelectedGraph }) => {
  return (
    <div className="charts__controls">
      <h3 className="charts__controls-title">controls</h3>
      <div className="charts__controls-main">
        <ul className="charts__controls-chartpicker">
          <li
            className="charts__controls-chart"
            onClick={() => updateSelectedGraph("pie")}
          >
            <PieChartIcon className="charts__controls-chart-icon" />
            Category Spending
          </li>
          <li
            className="charts__controls-chart"
            onClick={() => updateSelectedGraph("bar")}
          >
            <SignalCellularAltIcon className="charts__controls-chart-icon" />
            Income vs Spending
          </li>
          <li
            className="charts__controls-chart"
            onClick={() => updateSelectedGraph("line")}
          >
            <TimelineIcon className="charts__controls-chart-icon" />
            Spending over time
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChartControls;
