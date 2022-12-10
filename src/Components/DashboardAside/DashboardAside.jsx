import "./DashboardAside.scss";
import TransactionItem from "../TransactionItem/TransactionItem";

const DashboardAside = ({ transactionData }) => {
  return (
    <div className="dashboard__aside">
      <h3 className="dashboard__aside-title">transactions</h3>
      <p className="dashboard__aside-subtitle">Your last 10 transactions</p>
      <ul className="dashboard__aside-transactions">
        {transactionData
          .slice(transactionData.length - 10, transactionData.length)
          .map((transaction) => {
            return (
              <TransactionItem
                key={transaction.transaction_id}
                transactionData={transaction}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default DashboardAside;
