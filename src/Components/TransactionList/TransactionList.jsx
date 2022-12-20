import TransactionItem from "../TransactionItem/TransactionItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddCardIcon from "@mui/icons-material/AddCard";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import { Calendar } from "react-calendar";
import { useState, useEffect, useReducer } from "react";
import "react-calendar/dist/Calendar.css";
import "./TransactionList.scss";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";

const TransactionList = ({
  transactionData,
  transactionDates,
  updateTransactionDates,
  userInfo,
}) => {
  const [dateRange, setDateRange] = useState(null);
  const [catSort, setCatSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [calState, setCalState] = useState("");
  const [modalVis, setModalVis] = useState("");

  useEffect(() => {
    let date1 = new Date();
    let date2 = new Date();
    updateTransactionDates(
      new Date(date1.getFullYear(), date1.getMonth(), 1),
      new Date(date2.getFullYear(), date2.getMonth() + 1, 0)
    );
  }, []);

  const handleModalVis = () => {
    if (!modalVis) {
      setModalVis("--open");
    } else {
      setModalVis("");
    }
  };
  const reducer = (sortedData, action) => {
    switch (action.type) {
      case "update":
        return [action.payload.newData][0];
      case "category":
        if (!catSort) {
          setCatSort("--after");
          return [...sortedData].sort((a, b) => {
            if (a.category > b.category) {
              return 1;
            }
            if (a.category < b.category) {
              return -1;
            }
            return 0;
          });
        } else {
          setCatSort("");
          return [...sortedData].sort((a, b) => {
            if (a.category < b.category) {
              return 1;
            }
            if (a.category > b.category) {
              return -1;
            }
            return 0;
          });
        }
      case "date":
        if (!dateSort) {
          setDateSort("--after");
          return [...sortedData].sort((a, b) => {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          });
        } else {
          setDateSort("");
          return [...sortedData].sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          });
        }
      case "amount":
        if (!amountSort) {
          setAmountSort("--after");
          return [...sortedData].sort((a, b) => {
            return b.amount - a.amount;
          });
        } else {
          setAmountSort("");
          return [...sortedData].sort((a, b) => {
            return a.amount - b.amount;
          });
        }
      default:
        break;
    }
  };

  const [sortedData, dispatch] = useReducer(reducer, transactionData);

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
      updateTransactionDates(dateRange[0], dateRange[1]);
    }
  }, [dateRange]);

  useEffect(() => {
    dispatch({ type: "update", payload: { newData: transactionData } });
  }, [transactionData]);

  return (
    <div className="transaction-list">
      <AddTransactionModal
        modalVis={modalVis}
        handleModalVis={handleModalVis}
        userInfo={userInfo}
      />
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
        <div
          className="transaction-list__addbutton-wrapper"
          onClick={handleModalVis}
        >
          <AddCardIcon className="transaction-list__addbutton" />
        </div>
      </div>
      <div className="transaction-labels">
        <div className="transaction-labels-name-wrapper">
          <div className="transaction-labels-button-wrapper">
            <button
              className="transaction-labels-name"
              name="category"
              onClick={(e) => dispatch({ type: e.target.name })}
            >
              Name/Category{" "}
            </button>
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${catSort}`}
            />
          </div>
        </div>
        <div className="transaction-labels-date-wrapper">
          <div className="transaction-labels-button-wrapper">
            <button
              className="transaction-labels-date"
              name="date"
              onClick={(e) => dispatch({ type: e.target.name })}
            >
              Date{" "}
            </button>
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${dateSort}`}
            />
          </div>
        </div>
        <div className="transaction-labels-amount-wrapper">
          {" "}
          <div className="transaction-labels-button-wrapper">
            <button
              className="transaction-labels-amount"
              name="amount"
              onClick={(e) => dispatch({ type: e.target.name })}
            >
              Amount{" "}
            </button>
            <SwitchRightOutlinedIcon
              className={`transaction-labels-sort${amountSort}`}
            />
          </div>
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
