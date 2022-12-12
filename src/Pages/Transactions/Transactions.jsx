import NavBlock from "../../Components/NavBlock/NavBlock";
import TransactionList from "../../Components/TransactionList/TransactionList";
import "./Transactions.scss";

const Transactions = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  return (
    <div className="transactions-page">
      <NavBlock />
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
