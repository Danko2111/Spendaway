import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Charts from "./Pages/Charts/Charts";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Transactions from "./Pages/Transactions/Transactions";
import Settings from "./Pages/Settings/Settings";

function App() {
  const api_url = "http://localhost:5050";

  const [transactionData, setTransactionData] = useState(null);
  const [transactionDates, setTransactionDates] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(sessionStorage.getItem("authstatus"))
  );
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    axios
      .get(`${api_url}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTransactionDates = (date1, date2) => {
    const startDate = new Date(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    ).toLocaleDateString("en-ca");
    const endDate = new Date(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    ).toLocaleDateString("en-ca");
    setTransactionDates({ startDate: startDate, endDate: endDate });
  };

  const updateLoggedInStatus = () => {
    if (!isLoggedIn) {
      sessionStorage.setItem("authstatus", true);
      setIsLoggedIn(true);
    } else {
      sessionStorage.setItem("authstatus", false);
      setIsLoggedIn(false);
    }
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
    // console.log("transactionDates", transactionDates);
    if (transactionDates) {
      getUserTransactions();
      getUserInfo();
    }
  }, [transactionDates]);

  useEffect(() => {
    if (isLoggedIn) {
      let date1 = new Date();
      let date2 = new Date();
      updateTransactionDates(
        new Date(date1.getFullYear(), date1.getMonth(), 1),
        new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
      );
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-body">
          <Routes>
            <Route
              path="/"
              element={<Home updateLoggedInStatus={updateLoggedInStatus} />}
            ></Route>
            {transactionData && userInfo ? (
              <>
                <Route
                  path="/dashboard"
                  element={
                    <Dashboard
                      transactionData={transactionData}
                      transactionDates={transactionDates}
                      updateTransactionDates={updateTransactionDates}
                      updateLoggedInStatus={updateLoggedInStatus}
                      userInfo={userInfo}
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
                      updateLoggedInStatus={updateLoggedInStatus}
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
                      updateLoggedInStatus={updateLoggedInStatus}
                      userInfo={userInfo}
                    />
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={
                    <Settings
                      updateLoggedInStatus={updateLoggedInStatus}
                      userInfo={userInfo}
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
