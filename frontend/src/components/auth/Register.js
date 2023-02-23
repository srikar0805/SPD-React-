// import NavBar from "../NavBar/Navbar"
import useInput from "../../hooks/useInput";
import { useRequest } from "../../hooks/request-hook";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import ErrorModal from "../../Design/UIElements/ErrorModal"
import { useState } from "react";
import NavBar from "../NavBar";
// import { setDriver } from "mongoose";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
// console.log(isPassword.value)
const number = (value) => value.trim().length === 10;
let formValid = false;

const Register = () => {
  const { sendRequest } = useRequest();
  const navigate = useNavigate();
  // const { isError, clearError, sendRequest } = useRequest();
  const [mess, setmess] = useState("");
  const [err, seterr] = useState(false);
  // const auth = useContext(AuthContext)
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
      console.log("errorrrr");
      return;
    }
    const response = await sendRequest(
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

    console.log(response);
    navigate("/login");
    resetName();
    resetEmail();
    resetPassword();
    resetNumber();
  };
  return (
    <div className="backgroundimg">
      <NavBar />
      <div className="formcontainer">
        <form onSubmit={submitHandler}>
          <div className="form-register">
            <div className="img">
              <img
                src="https://www.linkpicture.com/q/logo_356.png"
                className="logo"
                alt="logo"
              />
            </div>
            <div className="title">Registration Form</div>
            <div className="subtitle">Let's create your account!</div>
            <div className="input-container ic1">
              <input
                id="name"
                className="input"
                type="text"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={nameValue}
                placeholder="Name"
              />

              {/* <div className="cut"></div> */}

              {nameError && <p className="error-text">Please Enter a Name!</p>}
            </div>
            <div className="input-container ic2">
              <input
                id="email"
                className="input"
                type="text"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={emailValue}
                placeholder="Email"
              />
              {/* <div className="cut cut-short"></div> */}

              {emailError && (
                <p className="error-text">Please Enter a valid Email!</p>
              )}
            </div>
            <div className="input-container ic2">
              <input
                id="password"
                className="input"
                type="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={passwordValue}
                placeholder="Password"
              />
              {/* <div className="cut"></div> */}
              {passwordError && (
                <p className="error-text">
                  Password should be atleast 5 characters long!
                </p>
              )}
            </div>
            <div className="input-container ic2">
              <input
                id="mobile"
                className="input"
                type="number"
                onChange={numberChangeHandler}
                onBlur={numberBlurHandler}
                value={numberValue}
                placeholder="Mobile"
              />

              {/* <div className="cut cut-short"></div> */}
              {numberError && (
                <p className="error-text">
                  Mobile Number should have 10 digits!
                </p>
              )}

              {/* {<p style={{ color: "red" }}>{isError}</p>} */}
            </div>
            <button type="submit" disabled={!formValid} className="submit">
              Submit
            </button>

            <Link to="/login">
              <button className="submit">Switch to Login</button>
            </Link>
          </div>
          {mess}
        </form>
      </div>
    </div>
  );
};

export default Register;
