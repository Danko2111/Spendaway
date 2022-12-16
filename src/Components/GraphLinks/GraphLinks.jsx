import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import "./GraphLinks.scss";

const GraphLinks = ({ updateSelectedGraph, selectedGraph }) => {
  return (
    <div className="graph-links">
      <button
        className={
          selectedGraph === "pie"
            ? "graph-links__item--active"
            : "graph-links__item"
        }
        onClick={() => updateSelectedGraph("pie")}
      >
        <PieChartIcon className="graph-links__chart-icon" />
        Category Spending
      </button>
      <button
        className={
          selectedGraph === "bar"
            ? "graph-links__item--active"
            : "graph-links__item"
        }
        onClick={() => updateSelectedGraph("bar")}
      >
        <SignalCellularAltIcon className="graph-links__chart-icon" />
        Income vs Spending
      </button>
      <button
        className={
          selectedGraph === "line"
            ? "graph-links__item--active"
            : "graph-links__item"
        }
        onClick={() => updateSelectedGraph("line")}
      >
        <TimelineIcon className="graph-links__chart-icon" />
        Transactions Over Time
      </button>
    </div>
  );
};

export default GraphLinks;
