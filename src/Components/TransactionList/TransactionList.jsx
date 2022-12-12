import TransactionItem from "../TransactionItem/TransactionItem";
import "./TransactionList.scss";

const TransactionList = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  return (
    <div className="transaction-list">
      <h3 className="transaction-list__title">transactions</h3>
      <p className="transaction-list__subtitle">
        {transactionDates.startDate} to {transactionDates.endDate}
      </p>
      <div className="transaction-labels">
        <p className="transaction-labels-name">Name/Category:</p>
        <p className="transaction-labels-date">Date:</p>
        <p className="transaction-labels-amount">Amount:</p>
      </div>
      <ul className="transaction-list__items">
        {transactionData.map((transaction) => {
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

export default TransactionList;
