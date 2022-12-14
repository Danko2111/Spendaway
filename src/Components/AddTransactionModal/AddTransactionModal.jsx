import CloseIcon from "@mui/icons-material/Close";
import "./AddTransactionModal.scss";

const AddTransactionModal = ({ modalVis, handleModalVis }) => {
  return (
    <div className={`modal-wrapper${modalVis}`}>
      <div className="modal">
        <CloseIcon className="modal__close-icon" onClick={handleModalVis} />
        <form className="modal__form">
          <h3 className="modal__form-title">add a new transaction</h3>
          
        </form>
      </div>
    </div>
  );
};
export default AddTransactionModal;
