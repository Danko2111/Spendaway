import axios from "axios";
import { useEffect, useState } from "react";
import DashboardAside from "../../Components/DashboardAside/DashboardAside";
import DashboardGraph from "../../Components/DashboardGraph/DashboardGraph";
import NavBlock from "../../Components/NavBlock/NavBlock";
import GetTime from "../../Utils/GetTime/GetTime";
import "./Dashboard.scss";

const Dashboard = ({ transactionData, transactionDates }) => {
  const api_url = "http://localhost:5050";
  const currTime = GetTime();
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    axios
      .get(`${api_url}/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data[0]);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo && transactionData ? (
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
          <DashboardGraph
            transactionData={transactionData}
            transactionDates={transactionDates}
          />
        </div>
        <DashboardAside transactionData={transactionData} />
      </div>
    </div>
  ) : null;
};

export default Dashboard;
