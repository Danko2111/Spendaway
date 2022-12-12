import "./ChartControls.scss";
import PieChartIcon from "@mui/icons-material/PieChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ChartControls = ({ updateSelectedGraph, updateTransactionDates }) => {
  const [dateRange, updateDateRange] = useState(null);

  useEffect(() => {
    if (dateRange) {
      updateTransactionDates(dateRange[0], dateRange[1]);
    }
  }, [dateRange]);

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
            Spending/Income over time
          </li>
        </ul>

        <form className="charts__controls-calendar-wrapper">
          <div className="charts__controls-calendar-inputs">
            <input
              className="charts__controls-calendar-date"
              type="text"
              value={dateRange ? dateRange[0].toDateString() : ""}
              readOnly
            ></input>
            <input
              className="charts__controls-calendar-date"
              type="text"
              value={dateRange ? dateRange[1].toDateString() : ""}
              readOnly
            ></input>
          </div>
          <Calendar
            className={"charts__controls-calendar"}
            minDetail="year"
            onChange={updateDateRange}
            selectRange={true}
            returnValue="range"
            value={dateRange}
          />
        </form>
      </div>
    </div>
  );
};

export default ChartControls;
