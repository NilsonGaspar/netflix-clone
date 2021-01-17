import { useState, useEffect } from "react";
import "./ProfileScreen";

function ProfileScreen({ userProfile, setUserProfile, mainProfile, setMainProfile }) {
  const [manageProfile, setManageProfile] = useState(true);

  return (
    <>
      {manageProfile ? (
        <div className="profile">
          <div className="profile-select">
            <h1>Who's Watching?</h1>
            <div className="profile-list">
              <img
                className="profile-avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
                alt="Netflix Avatar"
              />
              <p className="profile-name">Name</p>
            </div>
          </div>
          <button className="add-profile-btn">Add Profile</button>
        </div>
      ) : (
        <div className="create-profile">
          <form>
            <img
              className="profile-avatar"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
              alt="Netflix Avatar"
            />
            <button className="change-profile-avatar-btn">Add Profile</button>
            <input type="text" />
          </form>
        </div>
      )}
    </>
  );
}

export default ProfileScreen;
