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
import { useEffect } from "react";
import HashTransactions from "../../Utils/HashTransactions/HashTransactions";
import GraphLinks from "../GraphLinks/GraphLinks";

const LineGraph = ({
  transactionData,
  transactionDates,
  selectedGraph,
  updateSelectedGraph,
  updateTransactionDates,
}) => {
  let colors = ["rgba(255, 102, 144, 0.5)", "rgb(53, 170, 245, 0.5)"];
  if (localStorage.getItem("colorProfile")) {
    colors = JSON.parse(localStorage.getItem("colorProfile")).slice(9, 11);
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth() - 6, 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
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
        label: "Income",
        data: incomeArr[1],
        borderColor: colors[0],
        backgroundColor: colors[0],
      },
      {
        label: "Spending",
        data: spendArr[1],
        borderColor: colors[1],
        backgroundColor: colors[1],
      },
    ],
  };
  return (
    <div className="charts__main">
      <div className="line-charts__graph">
        <GraphLinks
          updateSelectedGraph={updateSelectedGraph}
          selectedGraph={selectedGraph}
        />
        <div className="line-charts__graph-heading">
          <h3 className="line-charts__graph-title">
            Spending/Income over time
          </h3>
          <p className="line-charts__graph-date">
            {transactionDates.startDate} to {transactionDates.endDate}
          </p>
        </div>
        <div className="line-charts__graph-data">
          <Line options={options} data={data} />
        </div>
      </div>
      <div className="line-charts__graph-info">
        <h3 className="line-charts__graph-info-title">Monthly Breakdown</h3>
        <div className="line-charts__graph-info-split">
          <div className="line-charts__graph-info-income">
            <h4 className="line-charts__graph-info-income-title">Income</h4>
            {incomeArr[0].map((monthly, index) => {
              return (
                <div className="line-charts__graph-info-item" key={index}>
                  <p className="line-charts__graph-info-income-month">
                    {monthly}
                  </p>
                  <p className="line-charts__graph-info-income-amount">
                    + ${parseFloat(incomeArr[1][index]).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="line-charts__graph-info-spending">
            <h4 className="line-charts__graph-info-spending-title">Spending</h4>
            {spendArr[0].map((monthly, index) => {
              return (
                <div className="line-charts__graph-info-item" key={index}>
                  <p className="line-charts__graph-info-spending-month">
                    {monthly}
                  </p>
                  <p className="line-charts__graph-info-spending-amount">
                    - ${parseFloat(spendArr[1][index]).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
