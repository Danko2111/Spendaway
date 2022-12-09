import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PieGraph.scss";

const PieGraph = ({ transactionData, transactionDates }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const result = transactionData.reduce((acc, { category, amount }) => {
    !acc[category] ? (acc[category] = amount) : (acc[category] += amount);
    return acc;
  }, {});
  const [graphData, setGraphData] = useState(result);
  const labels = [
    "Housing",
    "Utilities",
    "Personal",
    "Misc",
    "Entertainment",
    "Transportation",
    "Food",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "$ Spent",
        data: labels.map((item) => graphData[item]),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(40, 255, 225, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(20, 255, 225, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="charts__graph">
      <div className="charts__graph-heading">
        <h2 className="charts__graph-title">monthly spending</h2>
        <p className="charts__graph-date">
          {transactionDates.startDate} to {transactionDates.endDate}
        </p>
      </div>
      <div className="charts__graph-data">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieGraph;
