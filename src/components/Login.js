import { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "../Firebase";
import HandleRequests from "../HandleRequests";
import Avatar from "./Avatar.js";
import Signup from "./Signup";
import { Link } from "react-router-dom";

function Login({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const CleanInput = () => {
    setEmail("");
    setPassword("");
  };

  const HandleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.message);
    });
    CleanInput();
    setError("");
    // setShowChoseAvatar(false);
  };

  // function SaveProfile() {
  //   if (name) {
  //     HandleRequests.UpdgradeUserDetails(user, name, userAvatarURL);
  //     setShowChoseAvatar(false);
  //     setUserProfile({
  //       name,
  //       avatar: userAvatarURL,
  //     });
  //   }
  // }

  return (
    <div className="login">
      <div className="login-container">
        <h1 className="login-title">Sign In</h1>

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
          <button onClick={HandleLogin}>Login</button>
          <p>
            New to Netflix?
            <Link to="/signup">
              <span
                onClick={() => {
                  setError("");
                }}
              >
                Sign Up Now
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// return (
//   <>
//     {showChoseAvatar ? (
//       <div>
//         <Avatar
//           showChoseAvatar={showChoseAvatar}
//           setShowChoseAvatar={setShowChoseAvatar}
//           setUserAvatarURL={setUserAvatarURL}
//         />
//       </div>
//     ) : (
//       <div className="profile-details">
//         <div className="profile-content">
//           <h1 className="profile-title">User Details</h1>
//           <div className="profile-container">
//             <div className="profile-details">
//               <img
//                 className="profile-avatar"
//                 src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
//                 alt="Netflix Avatar"
//                 onClick={() => setShowChoseAvatar(true)}
//               />
//               <div className="profile-form">
//                 <form onSubmit={SaveProfile}>
//                   <input
//                     type="text"
//                     required
//                     value={name}
//                     placeholder="Name"
//                     onChange={(e) => setName(e.target.value)}
//                     size="40"
//                   />
//                 </form>
//               </div>
//             </div>
//           </div>
//           <button onClick={() => SaveProfile()} className="profile-btn">
//             Done
//           </button>
//         </div>
//       </div>
//     )}
//   </>
// );

export default Login;
