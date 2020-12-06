import React, { useState, useEffect } from "react";
import "./FeaturedMovie.css";
import HandleRequests from "../HandleRequests";
import YoutubePlayer from "./YoutubePlayer";

function FeaturedMovie({
  fetchURL,
  setGetMovie,
  setShowModal,
  videoKey,
  setVideoKey,
  handleShowNav,
}) {
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
    if (handleShowNav && play) {
      setPlay(false);
      setVideoKey("");
      setGetMovie([]);
    }
  }, [handleShowNav]);

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
      className="featured__movie"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "left top",
        backgroundImage: `url(${IMG_URL_HQ}${movie.backdrop_path})`,
      }}
    >
      {play ? <YoutubePlayer videoKey={videoKey} /> : ""}
      <div className="featured__movie__content">
        <h2 className="title">{movie?.name || movie?.original_name}</h2>
        <div className="featured__movie__description">
          {" "}
          {HandleRequests.HandleLongText(movie?.overview, 150)}
        </div>
        <div className="featured__movie__buttons">
          <button className="featured__movie__button btnPlay" onClick={() => PlayMovie(movie)}>
            &#9658; Play
          </button>
          <button className="featured__movie__button btnMoreInfo" onClick={() => OpenModal(movie)}>
            &#x1F6C8; More Info
          </button>
        </div>
      </div>
      <div className="fade__effect" />
    </div>
  );
}

export default FeaturedMovie;
