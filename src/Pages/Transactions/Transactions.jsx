import NavBlock from "../../Components/NavBlock/NavBlock";
import TransactionList from "../../Components/TransactionList/TransactionList";
import "./Transactions.scss";

const Transactions = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
  updateLoggedInStatus,
}) => {
  return (
    <div className="transactions-page">
      <NavBlock updateLoggedInStatus={updateLoggedInStatus} />
      <div className="transactions-page__content">
        <div className="transactions-page__main">
          <TransactionList
            transactionData={transactionData}
            transactionDates={transactionDates}
            updateTransactionDates={updateTransactionDates}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
