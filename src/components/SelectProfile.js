import React from "react";
import { useState } from "react";
import "./SelectProfile";

function SelectProfile({ user, setProfile }) {
  const [selectAvatar, setSelectAvatar] = useState(false);
  const [name, setName] = useState("");

  function SaveProfile() {
    if (user) {
      setProfile({ displayName: user.displayName, photoURL: user.photoURL });
    }
  }

  return (
    <>
      {selectAvatar ? (
        <div>
          {/* <Avatar
            selectAvatar={selectAvatar}
            setSelectAvatar={setSelectAvatar}
            setUserAvatarURL={setUserAvatarURL}
          /> */}
        </div>
      ) : (
        <div className="select-profile">
          <div className="select-profile-wrapper">
            <h1>Who's Watching?</h1>
            <div className="select-profile-list">
              <img
                className="select-profile-avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
                alt="Netflix Avatar"
                onClick={() => SaveProfile()}
              />
              <p className="select-profile-name">Name</p>
            </div>
          </div>
          <button className="add-profile-btn">Add Profile</button>
        </div>
      )}
    </>
  );
}

export default SelectProfile;
