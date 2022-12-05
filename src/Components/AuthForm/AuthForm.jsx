import "./AuthForm.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";

const AuthForm = ({ bgState }) => {
  const [activeForm, setActiveForm] = useState("login");

  const handleLoginFormSwitch = () => {
    setActiveForm("login");
  };
  const handleSignUpFormSwitch = () => {
    setActiveForm("");
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    const userObj = {
      username: e.target.username.value,
      pass: e.target.pass.value,
    };

    if (activeForm) {
      axios
        .post(`http://localhost:5050/login`, userObj)
        .then((res) => {
          console.log("You are Logged in");
          sessionStorage.setItem("token", res.data.token);
        })
        .catch((err) => {
          if (err.response.status && err.response.status === 400) {
            console.log("This username doesnt exist");
          }
        });
    } else if (!activeForm) {
      axios
        .post(`http://localhost:5050/signup`, userObj)
        .then((res) => {
          console.log(res);
          if (res.status && res.status === 205) {
            console.log("This username already exist");
          } else {
            console.log("success");
          }
        })
        .catch((err) =>
          console.log(`There was an issue with your form fields`)
        );
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
              onClick={handleSignUpFormSwitch}
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
