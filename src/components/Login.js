import React from "react";
import "./Login.css";

import { auth } from "../Firebase";

function Login({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  hasAccount,
  setHasAccount,
}) {
  const HandleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Code: ", errorCode);
      console.log("Message: ", errorMessage);
      setError(errorMessage);
    });
  };

  const HandleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log("Code: ", errorCode);
      console.log("Message: ", errorMessage);
      setError(errorMessage);
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <label>Email</label>
        <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="login-error-msg">{error}</p>
        <div className="login-content">
          {hasAccount ? (
            <>
              <button onClick={HandleLogin}>Login</button>
              <p>
                Don't have an account? <span onClick={() => setHasAccount(false)}>Sign Up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={HandleSignUp}>Sign Up</button>
              <p>
                Have an account? <span onClick={() => setHasAccount(true)}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
