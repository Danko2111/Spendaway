import "./TransactionItem.scss";

const TransactionItem = ({ transactionData }) => {
  const { name, category, amount, date } = transactionData;
  const parsedDate = new Date(date);
  let posNeg;
  let typeClass;
  if (category === "Income") {
    posNeg = "+ ";
    typeClass = "-pos";
  } else {
    typeClass = "-neg";
    posNeg = "- ";
  }
  return (
    <li className="transaction-item">
      <div className="transaction-item__title">
        <p className="transaction-item__name">{name}</p>
        <p className="transaction-item__category">{category}</p>
      </div>
      <p className="transaction-item__date">{parsedDate.toDateString()}</p>
      <div className="transaction-item__amount-wrapper">
        <p className={`transaction-item__amount${typeClass}`}>
          {posNeg}${parseFloat(amount).toFixed(2)}
        </p>
      </div>
    </li>
  );
};

export default TransactionItem;
