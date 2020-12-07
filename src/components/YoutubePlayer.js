import React from "react";
import "./YoutubePlayer.css";
function YoutubePlayer({ videoKey, showModal }) {
  const HandleVideoKey = videoKey?.[0]?.key;

  return (
    <div className="youtube-player">
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: showModal ? "100%" : "100vh",
        }}
        frameBorder="0"
        allowFullScreen={true}
        src={`https://www.youtube.com/embed/${HandleVideoKey}?autoplay=1&mute=1`}
      />
    </div>
  );
}

export default YoutubePlayer;
