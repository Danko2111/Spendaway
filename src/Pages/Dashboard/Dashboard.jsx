import DashboardAside from "../../Components/DashboardAside/DashboardAside";
import BarGraph from "../../Components/BarGraph/BarGraph";
import NavBlock from "../../Components/NavBlock/NavBlock";
import GetTime from "../../Utils/GetTime/GetTime";
import "./Dashboard.scss";

const Dashboard = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
  updateLoggedInStatus,
  userInfo,
}) => {
  const currTime = GetTime();
  return userInfo ? (
    <div className="dashboard">
      <NavBlock updateLoggedInStatus={updateLoggedInStatus} />
      <div className="dashboard__content">
        <div className="dashboard__main">
          <div className="dashboard__hero">
            <div className="dashboard__hero-text-wrapper">
              <h2 className="dashboard__hero-title">
                Good {currTime} {userInfo.username}
              </h2>
              <p className="dashboard__hero-text">Your current balance:</p>
            </div>
            <p className="dashboard__hero-balance">${userInfo.balance}</p>
          </div>
          <BarGraph
            transactionData={transactionData}
            transactionDates={transactionDates}
            updateTransactionDates={updateTransactionDates}
            onDashboard={true}
          />
        </div>
        <DashboardAside transactionData={transactionData} />
      </div>
    </div>
  ) : null;
};

export default Dashboard;
