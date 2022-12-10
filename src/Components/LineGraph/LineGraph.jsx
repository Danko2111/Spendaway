import "./LineGraph.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import HashTransactions from "../../Utils/GetTime/HashTransactions.jsx/HashTransactions";

const LineGraph = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  useEffect(() => {
    updateTransactionDates(new Date("2022-06-25"), new Date("2022-12-20"));
  }, []);

  const incomeArr = HashTransactions(transactionData, "Income");
  const spendArr = HashTransactions(transactionData, "Spending");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const data = {
    labels: incomeArr[0],
    datasets: [
      {
        label: "$ Income",
        data: incomeArr[1],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "$ Spending",
        data: spendArr[1],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return transactionData ? (
    <div className="line-charts__graph">
      <div className="line-charts__graph-heading">
        <h3 className="line-charts__graph-title">Spending over time</h3>
        <p className="line-charts__graph-date">
          {transactionDates.startDate} to {transactionDates.endDate}
        </p>
      </div>
      <div className="line-charts__graph-data">
        <Line options={options} data={data} />
      </div>
    </div>
  ) : null;
};

export default LineGraph;
