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

const LineGraph = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  useEffect(() => {
    updateTransactionDates(new Date("2022-07-25"), new Date("2022-12-20"));
  }, []);

  const hash = {};
  const transactionArr = [];
  transactionData.map((transaction) => {
    const month = new Date(transaction.date).getMonth();

    if (!hash[month]) {
      hash[month] = transaction.amount;
    } else {
      hash[month] += transaction.amount;
    }

    return {
      month: month,
      amount: transaction.amount,
    };
  });
  for (let i = 6; i < 12; i++) {
    transactionArr.push(hash[i]);
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: [transactionArr],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Spending",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="charts__graph">
      <div className="charts__graph-heading">
        <h3 className="charts__graph-title">Spending over time</h3>
        <p className="charts__graph-date">
          {transactionDates.startDate} to {transactionDates.endDate}
        </p>
      </div>
      <div className="charts__graph-data">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineGraph;
