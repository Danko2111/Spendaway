import axios from "axios";
import { useEffect, useState } from "react";
import DashboardAside from "../../Components/DashboardAside/DashboardAside";
import BarGraph from "../../Components/BarGraph/BarGraph";
import NavBlock from "../../Components/NavBlock/NavBlock";
import GetTime from "../../Utils/GetTime/GetTime";
import "./Dashboard.scss";

const Dashboard = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  const api_url = "http://localhost:5050";
  const currTime = GetTime();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    axios
      .get(`${api_url}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data[0]);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return userInfo ? (
    <div className="dashboard">
      <NavBlock />
      <div className="dashboard__content">
        <div className="dashboard__main">
          <div className="dashboard__hero">
            <h2 className="dashboard__hero-title">
              Good {currTime} {userInfo.username}
            </h2>
            <p className="dashboard__hero-balance">
              Your current balance: ${userInfo.balance}
            </p>
          </div>
          <BarGraph
            transactionData={transactionData}
            transactionDates={transactionDates}
            updateTransactionDates={updateTransactionDates}
          />
        </div>
        <DashboardAside transactionData={transactionData} />
      </div>
    </div>
  ) : null;
};

export default Dashboard;
