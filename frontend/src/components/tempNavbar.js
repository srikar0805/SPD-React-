import { useState, useContext } from "react";
import "./tempNavbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const TempNavbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logoutHandler = () => {
    auth.logout();
    localStorage.removeItem("user");
    navigate("/");
  };
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <Link className="navbar-brand" to="/">
        <span className="logo">
          <img src="https://www.linkpicture.com/q/logo_356.png"></img>
        </span>
      </Link>
      <Link
        to="/profile"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "1rem",
          margin: "1rem",
        }}
      >
        <span className="temptext">Profile</span>
      </Link>
      <Link
        to="/portfolio"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "1rem",
          margin: "1rem",
        }}
      >
        <span className="temptext">Portfolio</span>
      </Link>
      <Link
        to="/transactions"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "1rem",
          margin: "1rem",
        }}
      >
        <span className="temptext">Transactions</span>
      </Link>
      <Link
        to="/News"
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "1rem",
          margin: "1rem",
        }}
      >
        <span className="temptext">News</span>
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="black"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <div className="logout">
          <img src="https://cdn-icons-png.flaticon.com/512/126/126467.png" />
          <button className="logoutbutton" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TempNavbar;
