import "./AuthForm.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
import axios from "axios";

const AuthForm = ({ bgState, updateLoggedInStatus }) => {
  const [activeForm, setActiveForm] = useState(true);

  const handleLoginFormSwitch = () => {
    setErrClass("");
    setUserErrClass("");
    setPassErrClass("");
    setNewUserErrClass("");
    setActiveForm(true);
  };
  const handleSignUpFormSwitch = () => {
    setErrClass("");
    setUserErrClass("");
    setPassErrClass("");
    setNewUserErrClass("");
    setActiveForm(false);
  };

  const [userErrClass, setUserErrClass] = useState("");
  const [passErrClass, setPassErrClass] = useState("");
  const [errClass, setErrClass] = useState("");
  const [newUserErrClass, setNewUserErrClass] = useState("");

  const nav = useNavigate();

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    if (!e.target.username.value || !e.target.pass.value) {
      setErrClass("--error");
      e.target.reset();
    } else {
      const userObj = {
        username: e.target.username.value.toLowerCase(),
        pass: md5(e.target.pass.value),
      };
      if (activeForm) {
        axios
          .post(`http://localhost:5050/login`, userObj)
          .then((res) => {
            setErrClass("");
            setUserErrClass("");
            setPassErrClass("");
            if (res.status && res.status === 202) {
              setUserErrClass("--error");
            } else if (res.status && res.status === 203) {
              setPassErrClass("--error");
              e.target.pass.value = "";
            } else {
              setErrClass("");
              setUserErrClass("");
              setPassErrClass("");
              localStorage.setItem("token", res.data.token);
              updateLoggedInStatus();
              nav("/dashboard");
            }
          })
          .catch((err) => {
            console.log(`Internal server err ${err}`);
          });
      } else if (!activeForm) {
        axios
          .post(`http://localhost:5050/signup`, userObj)
          .then((res) => {
            setErrClass("");
            setUserErrClass("");
            if (res.status && res.status === 205) {
              setNewUserErrClass("--error");
            } else {
              setErrClass("");
              setNewUserErrClass("");
              alert("You have successfully created your account!");
              e.target.pass.value = "";
              e.target.username.value = "";
              setActiveForm("Login");
            }
          })
          .catch((err) => console.log(`Internal server err ${err}`));
      }
    }
  };

  return (
    <form className={`auth-form${bgState}`} onSubmit={formSubmissionHandler}>
      <div className="auth-form__title">
        {activeForm ? (
          <>
            <h2
              className={`auth-form__login--active`}
              onClick={handleLoginFormSwitch}
            >
              Login
            </h2>
            <h2
              className={`auth-form__signup`}
              onClick={handleSignUpFormSwitch}
            >
              Sign Up
            </h2>
          </>
        ) : (
          <>
            <h2 className={`auth-form__login`} onClick={handleLoginFormSwitch}>
              Login
            </h2>
            <h2
              className={`auth-form__signup--active`}
              onClick={handleSignUpFormSwitch}
            >
              Sign Up
            </h2>
          </>
        )}
      </div>
      <div className="auth-form__user-wrapper">
        <div
          className={`auth-form__input-wrapper${userErrClass}${errClass}${newUserErrClass}`}
        >
          <AccountCircleOutlinedIcon />
          <input
            className="auth-form__input"
            placeholder="Username"
            name="username"
          ></input>
        </div>
        {userErrClass && (
          <div className="auth-form__error-wrapper">
            <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
            <p className="auth-form__error-text">This user does not exist</p>
          </div>
        )}
        {newUserErrClass && (
          <div className="auth-form__error-wrapper">
            <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
            <p className="auth-form__error-text">
              This username is unavailable
            </p>
          </div>
        )}
        {errClass && (
          <div className="auth-form__error-wrapper">
            <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
            <p className="auth-form__error-text">Please fill in all fields</p>
          </div>
        )}
      </div>
      <div className="auth-form__pass-wrapper">
        <div className={`auth-form__input-wrapper${passErrClass}${errClass}`}>
          <LockOutlinedIcon />
          <input
            className="auth-form__input"
            placeholder="Password"
            type="password"
            name="pass"
          ></input>
        </div>
        {passErrClass && (
          <div className="auth-form__error-wrapper">
            <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
            <p className="auth-form__error-text">Incorrect password</p>
          </div>
        )}
        {errClass && (
          <div className="auth-form__error-wrapper">
            <ErrorOutlineIcon style={{ color: "red", fontSize: 20 }} />
            <p className="auth-form__error-text">Please fill in all fields</p>
          </div>
        )}
      </div>
      {activeForm ? (
        <button className="auth-form__button" type="submit">
          Login
        </button>
      ) : (
        <button className="auth-form__button" type="submit">
          Sign Up
        </button>
      )}
    </form>
  );
};

export default AuthForm;
