import NavBlock from "../../Components/NavBlock/NavBlock";
import UserInfoForm from "../../Components/UserInfoForm/UserInfoForm";
import ChartVisualSettings from "../../Components/ChartVisualSettings/ChartVisualSettings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Settings.scss";

const Settings = ({ updateLoggedInStatus, userInfo }) => {
  const showToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="settings">
      <NavBlock updateLoggedInStatus={updateLoggedInStatus} />
      <div className="settings__content">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="settings__user-details">
          <h3 className="settings__user-details-title">User Settings</h3>
          <UserInfoForm
            updateLoggedInStatus={updateLoggedInStatus}
            userInfo={userInfo}
            showToast={showToast}
          />
        </div>
        <ChartVisualSettings showToast={showToast} />
      </div>
    </div>
  );
};

export default Settings;
