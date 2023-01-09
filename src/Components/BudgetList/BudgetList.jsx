import { useState, useEffect } from "react";
import "./BudgetList.scss";

const BudgetList = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth(), 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
  }, []);

  return (
    <div className="budget-list">
      <div className="budget-list__header">
        <h3 className="budget-list__title">budget</h3>
        <p className="budget-list__subtitle">
          {transactionDates.startDate}to{transactionDates.endDate}
        </p>
      </div>
      <div className="budget-list__categories">
        
      </div>
    </div>
  );
};

export default BudgetList;
