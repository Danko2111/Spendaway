import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import "./AddTransactionModal.scss";

const AddTransactionModal = ({ modalVis, handleModalVis, userInfo }) => {
  const api_url = process.env.REACT_APP_BASE_URL;

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const nameUpdate = (e) => {
    setName(e.target.value);
  };
  const amountUpdate = (e) => {
    setAmount(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const currDate = new Date();
    const newTransaction = {
      transaction_id: uuidv4(),
      name: name,
      category: category,
      amount: parseFloat(amount),
      date: currDate.toLocaleDateString("en-ca"),
    };

    const updateBalance = () => {
      if (category !== "Income") {
        {
          return {
            balance: (userInfo.balance - parseFloat(amount)).toFixed(2),
          };
        }
      } else {
        {
          return {
            balance: (userInfo.balance + parseFloat(amount)).toFixed(2),
          };
        }
      }
    };

    axios
      .post(`${api_url}/transactions`, newTransaction, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        axios
          .put(`${api_url}/users`, updateBalance(), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            console.log("test");
            handleModalVis();
            window.location.reload();
          })
          .catch((err) => {
            console.log("test", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`modal-wrapper${modalVis}`} onClick={handleModalVis}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <CloseIcon className="modal__close-icon" onClick={handleModalVis} />
        <form className="modal__form" onSubmit={handleFormSubmit}>
          <h3 className="modal__form-title">add a new transaction</h3>
          <label className="modal__form-label">
            Purchase name{" "}
            <input
              type="text"
              className="modal__form-input"
              placeholder="What did you purchase?"
              name="name"
              value={name}
              onChange={nameUpdate}
            ></input>
          </label>
          <label className="modal__form-label" id="category">
            Purchase Category{" "}
            <select
              className="modal__form-select"
              value={category}
              onChange={handleChange}
            >
              <option value="" disabled selected hidden>
                Select Category
              </option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Housing"}>Housing</option>
              <option value={"Personal"}>Personal</option>
              <option value={"Transportation"}>Transportation</option>
              <option value={"Misc"}>Misc</option>
              <option value={"Food"}>Food</option>
              <option value={"Utilities"}>Utilities</option>
              <option value={"Income"}>Income</option>
            </select>
          </label>
          <label className="modal__form-label">
            Purchase Amount{" "}
            <input
              type="number"
              className="modal__form-input"
              placeholder="How much was it?"
              name="amount"
              value={amount}
              onChange={amountUpdate}
            ></input>
          </label>
          <button className="modal__form-submit" type="submit">
            Add Transaction <AddIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddTransactionModal;
