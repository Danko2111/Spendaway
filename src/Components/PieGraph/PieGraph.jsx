import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PieGraph.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = ({ transactionData, transactionDates }) => {
  const result = transactionData.reduce((acc, { category, amount }) => {
    !acc[category] ? (acc[category] = amount) : (acc[category] += amount);
    return acc;
  }, {});
  const [graphData] = useState(result);
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
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(40, 255, 225, 0.5)",
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
    <div className="pie-charts__graph">
      <div className="pie-charts__graph-heading">
        <h3 className="pie-charts__graph-title">Category Spending</h3>
        <p className="pie-charts__graph-date">
          {transactionDates.startDate} to {transactionDates.endDate}
        </p>
      </div>
      <div className="pie-charts__graph-data">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieGraph;
