import React, { useState, useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { BACKEND_URL } from "../../apiPaths";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      if (err.response && err.response.status === 400) {
        setErrorMessage("Username or password is invalid.");
      } else {
        console.error("Error logging user:", err);
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label> Username </label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label> Password </label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        {errorMessage && <p className="errorMessage" style = {{color : "red"}}>{errorMessage}</p>}
        <button className="loginButton" type="submit" disabled={isFetching}>
          {" "}
          Login{" "}
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          {" "}
          Register{" "}
        </Link>{" "}
      </button>{" "}
    </div>
  );
}
