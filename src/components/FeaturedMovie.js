import React, { useState, useEffect } from "react";
import "./FeaturedMovie.css";
import HandleRequests from "../HandleRequests";
import YoutubePlayer from "./YoutubePlayer";

function FeaturedMovie({ fetchURL, setGetMovie, setShowModal, videoKey, setVideoKey, showNav }) {
  const IMG_URL_HQ = "https://image.tmdb.org/t/p/original";
  const [movie, setMovie] = useState([]);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    async function FetchData() {
      const response = await HandleRequests.FetchData(fetchURL);
      setMovie(response.results[Math.floor(Math.random() * response.results.length)]);
      return response;
    }
    FetchData();
  }, []);

  useEffect(() => {
    if (showNav && play) {
      setPlay(false);
      setVideoKey("");
      setGetMovie([]);
    }
  }, [showNav]);

  async function OpenModal(movie) {
    setGetMovie(movie);
    setShowModal(true);
  }

  async function PlayMovie(movie) {
    window.scrollTo(0, 0);
    setGetMovie(movie);
    setPlay(true);
  }

  return (
    <div
      className="featured-movie"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "left top",
        backgroundImage: `url(${IMG_URL_HQ}${movie.backdrop_path})`,
      }}
    >
      {play ? <YoutubePlayer videoKey={videoKey} /> : ""}
      <div className="featured-movie-content">
        <h2 className="title">{movie?.name || movie?.original_name}</h2>
        <div className="featured-movie-description">
          {" "}
          {HandleRequests.HandleLongText(movie?.overview, 150)}
        </div>
        <div className="featured-movie-buttons">
          <button className="featured-movie-button btnPlay" onClick={() => PlayMovie(movie)}>
            &#9658; Play
          </button>
          <button className="featured-movie-button btnMoreInfo" onClick={() => OpenModal(movie)}>
            &#x1F6C8; More Info
          </button>
        </div>
      </div>
      <div className="fade-effect" />
    </div>
  );
}

export default FeaturedMovie;
