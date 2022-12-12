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
    updateTransactionDates(new Date("2022-06-01"), new Date("2022-12-31"));
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
  return (
    <div className="charts__main">
      <div className="line-charts__graph">
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
