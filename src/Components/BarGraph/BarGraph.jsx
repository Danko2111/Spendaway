import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import GraphLinks from "../GraphLinks/GraphLinks";
import "./BarGraph.scss";

const BarGraph = ({
  transactionData,
  transactionDates,
  selectedGraph,
  updateSelectedGraph,
  updateTransactionDates,
  onDashboard,
}) => {
  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth(), 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
  }, []);

  let colors = ["rgba(245, 151, 39, 0.5)", "rgba(39, 185, 245, 0.5)"];
  if (localStorage.getItem("colorProfile")) {
    colors = JSON.parse(localStorage.getItem("colorProfile")).slice(7, 9);
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
    },
  };
  const labels = [""];

  const genGraphData = (data) => {
    const income = data
      .filter((transaction) => {
        return transaction.category === "Income";
      })
      .map((transaction) => {
        return transaction.amount;
      })
      .reduce((a, b) => a + b, 0);
    const spending = data
      .filter((transaction) => {
        return transaction.category !== "Income";
      })
      .map((transaction) => {
        return transaction.amount;
      })
      .reduce((a, b) => a + b, 0);
    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: [income],
          backgroundColor: colors[0],
        },
        {
          label: "Spending",
          data: [spending],
          backgroundColor: colors[1],
        },
      ],
    };
  };
  return (
    <div className="charts__main">
      <div className="bar-charts__graph-wrapper">
        {!onDashboard ? (
          <GraphLinks
            updateSelectedGraph={updateSelectedGraph}
            selectedGraph={selectedGraph}
          />
        ) : null}
        <div className="bar-charts__graph-header">
          <h3 className="bar-charts__graph-title">Income vs Spending</h3>
          <p className="bar-charts__graph-date">
            {transactionDates.startDate} to {transactionDates.endDate}
          </p>
        </div>
        <div className="bar-charts__graph-data">
          <Bar options={options} data={genGraphData(transactionData)} />
        </div>
      </div>
      <div className="bar-charts__graph-info">
        <h3 className="bar-charts__graph-info-title">Money In/Out Breakdown</h3>
        <div className="bar-charts__graph-category">
          <p className="bar-charts__graph-category-name">
            {genGraphData(transactionData).datasets[0].label}
          </p>
          <p className="bar-charts__graph-category-amount">
            + $
            {parseFloat(
              genGraphData(transactionData).datasets[0].data[0]
            ).toFixed(2)}
          </p>
        </div>
        <div className="bar-charts__graph-category">
          <p className="bar-charts__graph-category-name">
            {genGraphData(transactionData).datasets[1].label}
          </p>
          <p className="bar-charts__graph-category-amount">
            - $
            {parseFloat(
              genGraphData(transactionData).datasets[1].data[0]
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
