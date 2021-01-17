import { useState, useEffect } from "react";
import "./ProfileScreen";

function ProfileScreen({ userProfile, setUserProfile, mainProfile, setMainProfile }) {
  const [manageProfile, setManageProfile] = useState(true);

  return (
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
  );
}

export default ProfileScreen;
