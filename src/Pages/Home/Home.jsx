import { useState } from "react";
import "./Home.scss";
import Logo from "../../assets/images/Logo.svg";
import smallLogo from "../../assets/images/smallLogo.svg";
import AuthForm from "../../Components/AuthForm/AuthForm";

const Home = ({ updateLoggedInStatus }) => {
  const [bgState, setBgState] = useState("");

  const handleContinueClick = () => {
    setBgState("--after");
  };

  return (
    <div className="home-page" onClick={(e) => handleContinueClick(e)}>
      <div className={`bg${bgState}`}>
        <div className="bg__circle1">
          <div className="bg__circle2">
            <div className="bg__circle3">
              <div className={`bg__circle3-textwrapper${bgState}`}>
                <h2 className="bg__circle3-title">Welcome to</h2>
                <img
                  className="bg__circle3-title--main"
                  alt="site logo"
                  src={Logo}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className={`bg__icon${bgState}`}
        alt="site logo"
        src={smallLogo}
      ></img>
      <AuthForm bgState={bgState} updateLoggedInStatus={updateLoggedInStatus} />
    </div>
  );
};

export default Home;
