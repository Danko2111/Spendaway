import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Logo from "../../assets/images/Logo.svg";
import "./NavBlock.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBlock = () => {
  const [navToggle, setNavToggle] = useState("");

  const navToggleHandler = () => {
    if (!navToggle) {
      setNavToggle("--after");
    } else {
      setNavToggle("");
    }
  };

  const nav = useNavigate();

  const logoutClickHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="navblock">
      <div className="navblock__logo-wrapper">
        <img className="navblock-logo" alt="logo" src={Logo}></img>
      </div>
      <div className={`navblock__links-wrapper${navToggle}`}>
        <div className="navblock__link" onClick={() => nav("/dashboard")}>
          <HomeIcon />
          <p className="navblock__link-text">Dashboard</p>
        </div>
        <div className="navblock__link" onClick={() => nav("/charts")}>
          <BarChartIcon />
          <p className="navblock__link-text">Charts</p>
        </div>
        <div className="navblock__link" onClick={() => nav("/transactions")}>
          <ReceiptIcon />
          <p className="navblock__link-text">Transactions</p>
        </div>
        <div className="navblock__link" onClick={() => nav("/settings")}>
          <SettingsIcon />
          <p className="navblock__link-text">Settings</p>
        </div>
        <button
          className="navblock__logout-button"
          onClick={(e) => logoutClickHandler(e)}
        >
          <LogoutIcon />
          <p className="navblock__logout-button-text">Log out</p>
        </button>
      </div>
      <div className="navblock__burger-menu" onClick={navToggleHandler}>
        <div className={`bar1${navToggle}`}></div>
        <div className={`bar2${navToggle}`}></div>
        <div className={`bar3${navToggle}`}></div>
      </div>
    </div>
  );
};

export default NavBlock;
