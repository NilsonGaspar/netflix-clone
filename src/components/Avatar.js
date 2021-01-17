import React from "react";
import AvatarData from "../AvatarData.js";
import "./Avatar.css";
import { VscArrowLeft } from "react-icons/vsc";

function Avatar({ setShowChoseAvatar, setUserAvatarURL }) {
  return (
    <div className="avatar">
      <div className="avatar-container">
        <h1 className="avatar-title">
          <VscArrowLeft className="avatar-arrow" onClick={() => setShowChoseAvatar(false)} />
          Edit Profile
        </h1>
        <p>Chose a profile icon.</p>
        {AvatarData.map((avatar) => (
          <div className="avatar-item">
            <img
              onClick={() => setUserAvatarURL(avatar.imageURL)}
              key={avatar.id}
              className="avatar-img"
              src={avatar.imageURL}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Avatar;
