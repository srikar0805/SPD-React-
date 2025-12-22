import useInput from "../../hooks/useInput";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { useRequest } from "../../hooks/request-hook";

const isEmail = (value) => value.includes("@");
const isPassword = (value) => value.trim().length >= 5;
let formValid = false;

const Login = () => {
  const { isError, sendRequest } = useRequest();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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

  if (emailisValid && passwordisValid) {
    formValid = true;
  }
  if (!emailisValid || !passwordisValid) {
    formValid = false;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      const response = await sendRequest(
        "http://localhost:5011/users/login",
        "POST",
        JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
        { "Content-Type": "application/json" }
      );
      resetEmail();
      resetPassword();
      auth.login(response.user.id);
      navigate("/profile");
    } catch (err) { }
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="form-container">
        <form onSubmit={submitHandler} className="loginform-content">
          <div className="text-center mb-2">
            <img
              src="/logo.png"
              className="logo"
              alt="logo"
              style={{ height: '60px' }}
            />
          </div>
          <div className="title">Login</div>

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
          <br />

          {isError && (
            <h4 style={{ color: "var(--error-color)", fontWeight: "bold", textAlign: 'center' }}>
              Wrong Credentials, try again
            </h4>
          )}
          <br></br>
          <button type="submit" disabled={!formValid} className="btn w-100 mb-2">
            Submit
          </button>
          <Link to="/register">
            <button className="btn btn-secondary w-100" style={{ backgroundColor: 'var(--secondary-color)' }}>Switch to Register</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
