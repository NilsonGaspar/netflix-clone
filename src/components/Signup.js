import { useState, useEffect } from "react";
import "./Login.css";
import firestore, { auth } from "../Firebase";
import { Link } from "react-router-dom";
import HandleRequests from "../HandleRequests";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const CleanInputs = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const HandleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        result.user.updateProfile({
          displayName: name,
          photoURL: Math.floor(Math.random() * 5) + 1,
        })
      )
      .then(() => {
        const user = auth.currentUser;
        HandleRequests.SaveUser(user);
      })
      .catch((error) => {
        setError(error.message);
      });

    CleanInputs();
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-title">Sign Up</h1>

        <input
          placeholder="First Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="login-error-msg">{error}</p>
        <div className="login-content">
          <button onClick={HandleSignUp}>Sign Up</button>

          <p>
            Have an account?
            <Link to="/login">
              <span onClick={() => setError("")}>Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
