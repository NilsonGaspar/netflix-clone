import { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "../Firebase";
import HandleRequests from "../HandleRequests";
import Avatar from "./Avatar.js";
import UseAuthListener from "./UseAuthListener";
import Login from "./Login";
import { Link } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          SaveSignupData(user);
        } else {
        }
      });
    };
    authListener();
  }, []);

  async function SaveSignupData(data) {
    let newUser = {
      uid: data.uid,
      userName: data.displayName,
      avatar: data.photoURL,
      email: data.email,
    };
    await HandleRequests.SaveUserDatabase(newUser);
  }

  const cleanInputs = () => {
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
      .catch((error) => {
        setError(error.message);
      });
    cleanInputs();
  };

  // async function SaveUser(data) {
  //   let newUser = {
  //     uid: data.uid,
  //     userName: name,
  //     avatar: Math.floor(Math.random() * 5) + 1,
  //     email: data.email,
  //   };
  //   await HandleRequests.SaveUserbase(newUser);
  // }

  // // function SaveProfile() {
  // //   if (name) {
  // //     HandleRequests.UpdgradeUserDetails(user, name, userAvatarURL);
  // //     setShowChoseAvatar(false);
  // //     // setUserProfile({
  // //     //   name,
  // //     //   avatar: userAvatarURL,
  // //     // });
  // //   }
  // // }

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
              <span
                onClick={() => {
                  setError("");
                }}
              >
                Sign In
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

export default Signup;
