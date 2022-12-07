import { useState } from "react";
import "./Home.scss";
import Logo from "../../assets/images/Logo.svg";
import smallLogo from "../../assets/images/smallLogo.svg";
import AuthForm from "../../Components/AuthForm/AuthForm";

const Home = () => {
  const [bgState, setBgState] = useState("");

  const handleContinueClick = () => {
    setBgState("--after");
  };

  return (
    <div className="home-page">
      <div className={`bg${bgState}`}>
        <div className="bg__circle1">
          <div className="bg__circle2">
            <div className="bg__circle3">
              <div
                className={`bg__circle3-textwrapper${bgState}`}
                onClick={(e) => handleContinueClick(e)}
              >
                <h2 className="bg__circle3-title">welcome to</h2>
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
      <AuthForm bgState={bgState} />
    </div>
  );
};

export default Home;
