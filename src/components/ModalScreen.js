import React, { useState, useEffect, useRef } from "react";

import "./ModalScreen.css";
import YoutubePlayer from "./YoutubePlayer.js";
import HandleRequests from "../HandleRequests";

// icons

import { VscChromeClose, VscDebugBreakpointFunction } from "react-icons/vsc";

function ModalScreen({ showModal, setShowModal, getMovie, setGetMovie, videoKey, setVideoKey }) {
  const MOVIE_URL = "https://api.themoviedb.org/3/movie/";
  const TV_URL = "https://api.themoviedb.org/3/tv/";
  const IMG_URL_LQ = "https://image.tmdb.org/t/p/w500";

  const [movieDetails, setMovieDetails] = useState([]);
  const [getSeason, setGetSeason] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  let genres = [];
  for (let i in movieDetails?.genres) {
    genres.push(movieDetails.genres[i].name);
  }

  function HandleYear() {
    const HandleYear = new Date(getMovie?.first_air_date || getMovie?.release_date);
    return HandleYear;
  }
  const NumberOfSeason = (N) => {
    setNumberOfSeasons(Array.from({ length: N }, (_, i) => i + 1));
    console.log(numberOfSeasons);
  };

  useEffect(() => {
    async function FetchVideoData(getMovie) {
      // Movie Section
      if (getMovie?.video === false) {
        // YouTube Trailer
        const data = await HandleRequests.FetchData(`${MOVIE_URL}${getMovie.id}/videos?`);
        setVideoKey(data.results);

        const MovieDetails = await HandleRequests.FetchData(`${MOVIE_URL}${getMovie?.id}?`);
        setMovieDetails(MovieDetails);

        const SimilarShowsList = await HandleRequests.FetchData(
          `${MOVIE_URL}${getMovie?.id}/similar?`
        );
        setSimilarShows(SimilarShowsList.results.backdrop_path && SimilarShowsList.results);
      } else {
        // TV Section
        const data = await HandleRequests.FetchData(`${TV_URL}${getMovie?.id}/videos?`);
        setVideoKey(data.results);

        if (showModal) {
          const MovieDetails = await HandleRequests.FetchData(`${TV_URL}${getMovie?.id}?`);
          setMovieDetails(MovieDetails);
          console.log("TV Show Details: ", MovieDetails);

          NumberOfSeason(MovieDetails.number_of_seasons);

          const SeasonsDetails = await HandleRequests.FetchData(
            `${TV_URL}${getMovie?.id}/season/1?`
          );
          setGetSeason(SeasonsDetails.episodes);
          console.log("Season Details ", SeasonsDetails);

          const SimilarShowsList = await HandleRequests.FetchData(
            `${TV_URL}${getMovie?.id}/similar?`
          );
          setSimilarShows(SimilarShowsList.results);
        }
      }
    }
    FetchVideoData(getMovie);
  }, [getMovie]);

  async function SeasonsDetails(season) {
    const SeasonsDetails = await HandleRequests.FetchData(
      `${TV_URL}${getMovie?.id}/season/${season}?`
    );
    setGetSeason(SeasonsDetails.episodes);
    console.log("Season Details2 ", SeasonsDetails);
  }

  function CleanInputs() {
    setMovieDetails([]);
    setGetSeason([]);
    setVideoKey([]);
    setGetMovie([]);
  }

  useEffect(() => {
    if (showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
  }, [showModal]);

  return (
    <div className={`modal ${showModal ? "is-open" : ""}`}>
      <div
        className={`overlay ${showModal ? "is-open" : ""}`}
        onClick={() => {
          setShowModal(false);
          CleanInputs();
        }}
      ></div>
      <div className="modal-content">
        <div className="modal-player">
          <button
            className="modal-btn-close"
            onClick={() => {
              setShowModal(false);
              CleanInputs();
            }}
          >
            <VscChromeClose />
          </button>
        </div>
        <YoutubePlayer videoKey={videoKey} showModal={showModal} />
        <div className="modal-info">
          <div className="modal-vote">{getMovie?.vote_average} Rating</div>

          {movieDetails?.number_of_seasons && (
            <div className="modal-season">
              {movieDetails?.number_of_seasons} Season
              {movieDetails?.number_of_seasons !== 1 ? "s" : ""}
            </div>
          )}
          <div className="modal-date">{HandleYear().getFullYear()}</div>

          <div className="modal-genre">
            <span className="modal-genre-span">
              {genres.length === 1 ? "Genre: " : "Genres: "}{" "}
            </span>{" "}
            {genres.join(", ")}
          </div>
          <div className="modal-overview">{getMovie?.overview}</div>

          <div className="modal-select-season">
            <select onChange={(e) => SeasonsDetails(e.target.value)}>
              {numberOfSeasons.map((season) => (
                <option value={season}>Season {season}</option>
              ))}
            </select>
            <span className={`custom-arrow ${isOpen ? "is-open" : ""}`}>
              <VscDebugBreakpointFunction />
            </span>
          </div>
        </div>

        {getSeason?.[0] ? <h2 className="season-title">Episodes</h2> : ""}

        {getSeason?.map((season, key) => (
          <div key={season.id} className="season-item">
            <div className="season-episode">{key + 1}</div>
            <img className="season-poster" src={`${IMG_URL_LQ}${season.still_path}`} />
            <div className="season-details">
              <div className="season-episode-name">{season.name}</div>
              <div className="seasonn-episode-vote">{season.vote_average} Rating</div>
              <div className="season-episode-overview">{season.overview}</div>
            </div>
          </div>
        ))}

        {!getSeason?.[0] ? (
          <h2 className="season-title">More Like This</h2>
        ) : (
          <h2 className="more-like-this-title">More Like This</h2>
        )}
        <div class="more-like-this">
          {similarShows?.slice(0, 6).map((tvshow) => (
            <>
              {tvshow.backdrop_path || tvshow.poster_path ? (
                <div className="more-like-this-item">
                  <img
                    className="more-like-this-poster"
                    src={`${IMG_URL_LQ}${tvshow.backdrop_path || tvshow.poster_path}`}
                  />
                  <div className="more-like-this-vote">{tvshow.vote_average} Rating</div>
                  <div className="more-like-this-date">
                    {
                      (similarShows.first_air_date = new Date(
                        tvshow.first_air_date || tvshow.release_date
                      ).getFullYear())
                    }
                  </div>
                  <div className="more-like-this-overview">
                    {HandleRequests.HandleLongText(tvshow.overview, 115)}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalScreen;
