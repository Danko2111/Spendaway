import { Line } from "rc-progress";
import "./BudgetItem.scss";

const BudgetItem = ({ transactionData, catTotal }) => {
  return (
    <div className="budget-item">
      <div className="budget-item__category-name-wrapper">
        <p className="budget-item__category-name">{catTotal[0]}</p>
      </div>
      <div className="budget-item__category-progress-wrapper">
        <Line
          percent={(catTotal[1] / 3000) * 100}
          strokeWidth={3}
          strokeColor="#10463f"
        />
      </div>
      <div className="budget-item__category-amount-wrapper">
        <p className="budget-item__category-amount">
          ${parseFloat(catTotal[1]).toFixed(2)} / ${3000}
        </p>
      </div>
    </div>
  );
};

export default BudgetItem;
