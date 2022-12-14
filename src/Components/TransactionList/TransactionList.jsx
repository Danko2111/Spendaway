import TransactionItem from "../TransactionItem/TransactionItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddCardIcon from "@mui/icons-material/AddCard";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import { Calendar } from "react-calendar";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./TransactionList.scss";

const TransactionList = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
}) => {
  const [dateRange, setDateRange] = useState(null);
  const [catSort, setCatSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [sortedData, setSortedData] = useState(transactionData);
  const [calState, setCalState] = useState("");
  const handleSortButton = (event) => {
    switch (event.target.name) {
      case "category":
        if (!catSort) {
          setCatSort("--after");
          const newData = [...transactionData].sort((a, b) => {
            if (a.category > b.category) {
              return 1;
            }
            if (a.category < b.category) {
              return -1;
            }
            return 0;
          });
          setSortedData(newData);
        } else {
          setCatSort("");
          const newData = [...transactionData].sort((a, b) => {
            if (a.category < b.category) {
              return 1;
            }
            if (a.category > b.category) {
              return -1;
            }
            return 0;
          });
          setSortedData(newData);
        }
        break;
      case "date":
        if (!dateSort) {
          setDateSort("--after");
          const newData = [...transactionData].sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          });
          setSortedData(newData);
        } else {
          setDateSort("");
          const newData = [...transactionData].sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          });
          setSortedData(newData);
        }
        break;
      case "amount":
        if (!amountSort) {
          setAmountSort("--after");
          const newData = [...transactionData].sort((a, b) => {
            return b.amount - a.amount;
          });
          setSortedData(newData);
        } else {
          setAmountSort("");
          const newData = [...transactionData].sort((a, b) => {
            return a.amount - b.amount;
          });
          setSortedData(newData);
        }
        break;
      default:
        break;
    }
  };

  const handleCalButtonClick = () => {
    if (calState === "") {
      setCalState("--after");
    } else {
      setCalState("");
    }
  };

  useEffect(() => {
    if (calState === "--after") {
      setCalState("");
    }
    if (dateRange) {
      console.log(dateRange);
      updateTransactionDates(dateRange[0], dateRange[1]);
    }
  }, [dateRange]);

  return (
    <div className="transaction-list">
      <div className="transaction-list__header">
        <h3 className="transaction-list__title">transactions</h3>
        <p
          className="transaction-list__subtitle"
          onClick={handleCalButtonClick}
        >
          {dateRange
            ? dateRange[0].toLocaleDateString("en-ca")
            : transactionDates.startDate}{" "}
          to{" "}
          {dateRange
            ? dateRange[1].toLocaleDateString("en-ca")
            : transactionDates.endDate}
          <ArrowDropDownIcon
            className={`transaction-list__dropdown${calState}`}
          />
        </p>

        <Calendar
          className={`transaction-list__calendar${calState}`}
          minDetail="year"
          onChange={setDateRange}
          selectRange={true}
          returnValue="range"
          value={dateRange}
        />
        <AddCardIcon className="transaction-list__addbutton" />
      </div>
      <div className="transaction-labels">
        <div className="transaction-labels-name-wrapper">
          <button
            className="transaction-labels-name"
            name="category"
            onClick={(e) => {
              handleSortButton(e);
            }}
          >
            Name/Category{" "}
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${catSort}`}
            />
          </button>
        </div>
        <div className="transaction-labels-date-wrapper">
          <button
            className="transaction-labels-date"
            name="date"
            onClick={(e) => handleSortButton(e)}
          >
            Date{" "}
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${dateSort}`}
            />
          </button>
        </div>
        <div className="transaction-labels-amount-wrapper">
          {" "}
          <button
            className="transaction-labels-amount"
            name="amount"
            onClick={(e) => handleSortButton(e)}
          >
            Amount{" "}
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${amountSort}`}
            />
          </button>
        </div>
      </div>
      <ul className="transaction-list__items">
        {sortedData.map((transaction) => {
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
