import BudgetList from "../../Components/BudgetList/BudgetList";
import NavBlock from "../../Components/NavBlock/NavBlock";
import "./Budget.scss";

const Budget = ({
  transactionData,
  updateLoggedInStatus,
  transactionDates,
  updateTransactionDates,
}) => {
  return (
    <div className="budget-page">
      <NavBlock updateLoggedInStatus={updateLoggedInStatus} />
      <div className="budget-page__content">
        <div className="budget-page__main">
          <BudgetList
            transactionData={transactionData}
            transactionDates={transactionDates}
            updateTransactionDates={updateTransactionDates}
          />
        </div>
      </div>
    </div>
  );
};

export default Budget;
