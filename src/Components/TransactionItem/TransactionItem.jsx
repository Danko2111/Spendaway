import "./TransactionItem.scss";

const TransactionItem = ({ transactionData }) => {
  const { name, category, amount, date } = transactionData;
  const parsedDate = new Date(date);
  let posNeg;
  if (category === "Income") {
    posNeg = "+ ";
  } else {
    posNeg = "- ";
  }
  return (
    <li className="transaction-item">
      <div className="transaction-item__title">
        <p className="transaction-item__name">{name}</p>
        <p className="transaction-item__category">{category}</p>
      </div>
      <p className="transaction-item__date">{parsedDate.toDateString()}</p>
      <p className="transaction-item__amount">
        {posNeg}${parseFloat(amount).toFixed(2)}
      </p>
    </li>
  );
};

export default TransactionItem;
