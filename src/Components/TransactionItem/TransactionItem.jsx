import "./TransactionItem.scss";

const TransactionItem = ({ transactionData }) => {
  const { name, category, amount, date } = transactionData;
  const parsedDate = new Date(date);
  return (
    <li className="transaction-item">
      <div className="transaction-item__title">
        <p className="transaction-item__name">{name}</p>
        <p className="transaction-item__category">{category}</p>
      </div>
      <p className="transaction-item__date">{parsedDate.toDateString()}</p>
      <p className="transaction-item__amount">{amount}</p>
    </li>
  );
};

export default TransactionItem;
