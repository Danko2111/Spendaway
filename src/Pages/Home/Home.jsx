import { useState } from "react";
import "./Home.scss";
import AuthForm from "../../Components/AuthForm/AuthForm";

const Home = () => {
  const [bgState, setBgState] = useState("");

  const handleContinueClick = () => {
    setBgState("--after");
  };

  return (
    <div className="home-page">
      <div className={`bg${bgState}`} onClick={(e) => handleContinueClick(e)}>
        <div className="bg__circle1">
          <div className="bg__circle2">
            <div className="bg__circle3">
              <div className={`bg__circle3-textwrapper${bgState}`}>
                <h2 className="bg__circle3-title">welcome to</h2>
                <h1 className="bg__circle3-title--main">spendaway</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthForm bgState={bgState} />
    </div>
  );
};

export default Home;
