import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Charts from "./Pages/Charts/Charts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Transactions from "./Pages/Transactions/Transactions";

function App() {
  const api_url = "http://localhost:5050";

  const [transactionData, setTransactionData] = useState(null);
  const [transactionDates, setTransactionDates] = useState(null);

  const updateTransactionDates = (date1, date2) => {
    const startDate = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    )
      .toISOString()
      .substring(0, 10);
    const endDate = new Date(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    )
      .toISOString()
      .substring(0, 10);
    setTransactionDates({ startDate: startDate, endDate: endDate });
  };

  const getUserTransactions = () => {
    axios
      .get(
        `${api_url}/transactions?startDate=${transactionDates.startDate}&endDate=${transactionDates.endDate}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTransactionData(res.data);
      });
  };
  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth(), 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
  }, []);

  useEffect(() => {
    if (transactionDates) getUserTransactions();
  }, [transactionDates]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {transactionData ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      transactionData={transactionData}
                      transactionDates={transactionDates}
                      updateTransactionDates={updateTransactionDates}
                    />
                  }
                ></Route>
                <Route
                  path="/charts"
                  element={
                    <Charts
                      transactionData={transactionData}
                      transactionDates={transactionDates}
                      updateTransactionDates={updateTransactionDates}
                    />
                  }
                ></Route>
                <Route
                  path="/transactions"
                  element={
                    <Transactions
                      transactionData={transactionData}
                      transactionDates={transactionDates}
                      updateTransactionDates={updateTransactionDates}
                    />
                  }
                ></Route>
              </>
            ) : null}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
