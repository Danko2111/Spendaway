import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";
import "./PieGraph.scss";
import GraphLinks from "../GraphLinks/GraphLinks";

const PieGraph = ({
  transactionData,
  transactionDates,
  updateSelectedGraph,
  selectedGraph,
  updateTransactionDates,
}) => {
  let colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
    "rgba(40, 255, 225, 0.5)",
  ];
  if (localStorage.getItem("colorProfile")) {
    colors = JSON.parse(localStorage.getItem("colorProfile"));
  }

  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth(), 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
  }, []);

  const result = transactionData.reduce((acc, { category, amount }) => {
    !acc[category] ? (acc[category] = amount) : (acc[category] += amount);
    return acc;
  }, {});

  const [graphData, setGraphData] = useState(result);

  useEffect(() => {
    setGraphData(result);
  }, [transactionData]);

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
        backgroundColor: colors,
        borderColor: "rgb(128, 128, 128, 0.8)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="charts__main">
      <div className="pie-charts__graph">
        <GraphLinks
          updateSelectedGraph={updateSelectedGraph}
          selectedGraph={selectedGraph}
        />
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
      <div className="pie-charts__graph-info">
        <h3 className="pie-charts__graph-info-title">Category Breakdown</h3>
        {labels.map((category, index) => {
          return (
            <div className="pie-charts__graph-category" key={index}>
              <p className="pie-charts__graph-category-name">{category}</p>
              <p className="pie-charts__graph-category-amount">
                - ${parseFloat(graphData[category]).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieGraph;
