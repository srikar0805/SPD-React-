import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../NavBar";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
const number = (value) => value.trim().length === 10;
let formValid = false;

const Register = () => {
  const { sendRequest } = useRequest();
  const navigate = useNavigate();
  const [mess, setmess] = useState("");

  const {
    value: nameValue,
    isValid: nameisValid,
    hasError: nameError,
    valueChangeHandler: nameChangeHandler,
    BlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailisValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordisValid,
    hasError: passwordError,
    valueChangeHandler: passwordChangeHandler,
    BlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const {
    value: numberValue,
    isValid: numberisValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    BlurHandler: numberBlurHandler,
    reset: resetNumber,
  } = useInput(number);

  if (nameisValid && emailisValid && passwordisValid && numberisValid) {
    formValid = true;
  }
  if (!nameisValid || !emailisValid || !passwordisValid || !numberisValid) {
    formValid = false;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      await sendRequest(
        "http://localhost:5011/users/signup",
        "POST",
        JSON.stringify({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          mobile: numberValue,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/login");
      resetName();
      resetEmail();
      resetPassword();
      resetNumber();
    } catch (err) { }
  };
  return (
    <div className="page-container">
      <NavBar />
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <div className="text-center mb-2">
            <img
              src="/logo.png"
              className="logo"
              alt="logo"
              style={{ height: '60px' }}
            />
          </div>
          <div className="title">Registration Form</div>
          <p className="text-center text-secondary mb-2">Let's create your account!</p>

          <div className="input-container">
            <input
              id="name"
              type="text"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
              placeholder="Name"
            />
            {nameError && <p className="error-text">Please Enter a Name!</p>}
          </div>
          <div className="input-container">
            <input
              id="email"
              type="text"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={emailValue}
              placeholder="Email"
            />
            {emailError && (
              <p className="error-text">Please Enter a valid Email!</p>
            )}
          </div>
          <div className="input-container">
            <input
              id="password"
              type="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue}
              placeholder="Password"
            />
            {passwordError && (
              <p className="error-text">
                Password should be at least 5 characters long!
              </p>
            )}
          </div>
          <div className="input-container">
            <input
              id="mobile"
              type="number"
              onChange={numberChangeHandler}
              onBlur={numberBlurHandler}
              value={numberValue}
              placeholder="Mobile"
            />
            {numberError && (
              <p className="error-text">
                Mobile Number should have 10 digits!
              </p>
            )}
          </div>

          <button type="submit" disabled={!formValid} className="btn w-100 mb-2">
            Submit
          </button>

          <Link to="/login">
            <button className="btn btn-secondary w-100" style={{ backgroundColor: 'var(--secondary-color)' }}>Switch to Login</button>
          </Link>

          {mess}
        </form>
      </div>
    </div>
  );
};

export default Register;
