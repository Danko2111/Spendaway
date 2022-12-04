import "./AuthForm.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

const AuthForm = ({ bgState }) => {
  const [activeForm, setActiveForm] = useState("login");

  const handleLoginFormSwitch = () => {
    setActiveForm("login");
  };
  const handleSignUpForm = () => {
    setActiveForm("");
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
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
            <h2 className={`auth-form__signup`} onClick={handleSignUpForm}>
              Sign-Up
            </h2>
          </>
        ) : (
          <>
            <h2 className={`auth-form__login`} onClick={handleLoginFormSwitch}>
              Login
            </h2>
            <h2
              className={`auth-form__signup--active`}
              onClick={handleSignUpForm}
            >
              Sign-Up
            </h2>
          </>
        )}
      </div>
      <div className="auth-form__input-wrapper">
        <AccountCircleOutlinedIcon />
        <input
          className="auth-form__input"
          placeholder="Username"
          name="username"
        ></input>
      </div>
      <div className="auth-form__input-wrapper">
        <LockOutlinedIcon />
        <input
          className="auth-form__input"
          placeholder="Password"
          type="password"
          name="pass"
        ></input>
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
