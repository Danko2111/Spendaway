import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";
import axios from "axios";
import "./UserInfoForm.scss";

const UserInfoForm = ({ updateLoggedInStatus, userInfo }) => {
  const api_url = process.env.REACT_APP_BASE_URL;
  const [errClass, setErrClass] = useState("");
  const [newUserErrClass, setNewUserErrClass] = useState("");

  const [username, setUsername] = useState(userInfo.username);
  const [pass, setPass] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const nav = useNavigate();

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    const userObj = {
      username: username === userInfo.username ? "" : username.toLowerCase(),
      pass: pass ? md5(pass) : "",
    };
    if (!userObj.username && !userObj.pass) {
      setErrClass("--error");
    } else {
      axios
        .put(`${api_url}/users/update-user`, userObj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setErrClass("");
          if (res.status && res.status === 205) {
            setNewUserErrClass("--error");
          } else {
            setErrClass("");
            localStorage.removeItem("token");
            updateLoggedInStatus();
            nav("/");
          }
        })
        .catch((err) => {
          console.log(`Internal server err ${err}`);
        });
    }
  };
  return (
    <div className="user-info">
      <form className="user-info-form" onSubmit={formSubmissionHandler}>
        <div className="user-info-form__user-wrapper">
          <div
            className={`user-info-form__input-wrapper${errClass}${newUserErrClass}`}
          >
            <AccountCircleOutlinedIcon />
            <input
              className="user-info-form__input"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
          {newUserErrClass && (
            <div className="user-info-form__error-wrapper">
              <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
              <p className="user-info-form__error-text">
                This username is unavailable
              </p>
            </div>
          )}
          {errClass && (
            <div className="user-info-form__error-wrapper">
              <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
              <p className="user-info-form__error-text">
                Please fill in all fields
              </p>
            </div>
          )}
        </div>
        <div className="user-info-form__pass-wrapper">
          <div className={`user-info-form__input-wrapper${errClass}`}>
            <LockOutlinedIcon />
            <input
              className="user-info-form__input"
              placeholder="Password"
              type="password"
              name="pass"
              value={pass}
              onChange={handlePassChange}
            ></input>
          </div>
          {errClass && (
            <div className="user-info-form__error-wrapper">
              <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
              <p className="user-info-form__error-text">
                Please fill in all fields
              </p>
            </div>
          )}
        </div>
        <div className="user-info-form__buttons">
          <button className="user-info-form__button" type="submit">
            change
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
