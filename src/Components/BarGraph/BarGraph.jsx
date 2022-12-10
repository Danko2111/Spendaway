import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./BarGraph.scss";

const BarGraph = ({ transactionData, transactionDates }) => {
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
  const labels = ["December"];

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
          backgroundColor: "rgba(245, 151, 39, 0.8)",
        },
        {
          label: "Spendings",
          data: [spending],
          backgroundColor: "rgba(39, 185, 245, 0.8)",
        },
      ],
    };
  };

  return (
    <div className="dashboard__graph-wrapper">
      <h3 className="dashboard__graph-title">Income vs Spending</h3>
      <p className="dashboard__graph-date">
        {transactionDates.startDate} to {transactionDates.endDate}
      </p>
      <div className="dashboard__graph-data">
        <Bar options={options} data={genGraphData(transactionData)} />
      </div>
    </div>
  );
};

export default BarGraph;
