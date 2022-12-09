import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Charts from "./Pages/Charts/Charts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";

function App() {
  const api_url = "http://localhost:5050";

  const [transactionData, setTransactionData] = useState(null);
  const [transactionDates, setTransactionDates] = useState(null);

  const getUserTransactions = () => {
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
      .toISOString()
      .substring(0, 10);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      .toISOString()
      .substring(0, 10);

    setTransactionDates({ startDate: startDate, endDate: endDate });

    axios
      .get(
        `${api_url}/transactions?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setTransactionData(res.data);
      });
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  return transactionData ? (
    <div className="App">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  transactionData={transactionData}
                  transactionDates={transactionDates}
                />
              }
            ></Route>
            <Route
              path="/charts"
              element={
                <Charts
                  transactionData={transactionData}
                  transactionDates={transactionDates}
                />
              }
            ></Route>
            <Route path="/transactions" element={<Dashboard />}></Route>
            <Route path="/settings" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  ) : null;
}

export default App;
