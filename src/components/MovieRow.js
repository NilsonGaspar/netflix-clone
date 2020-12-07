import React, { useState, useEffect, useRef } from "react";
import "./MovieRow.css";
import HandleRequests from "../HandleRequests";

// icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function MovieRow({ title, fetchURL, largePoster, setGetMovie, setShowModal }) {
  const IMG_URL_LQ = "https://image.tmdb.org/t/p/w500";

  const [movieList, setMovieList] = useState([]);
  const [showArrow, setShowArrow] = useState(false);
  const [scrollOffsetLeft, setScrollOffsetLeft] = useState(50);

  const ref = useRef();

  useEffect(() => {
    async function FetchMovieData() {
      const data = await HandleRequests.FetchData(fetchURL);
      setMovieList(data.results);
    }
    FetchMovieData();
  }, [fetchURL]);

  async function OpenModal(movie) {
    setGetMovie(movie);
    setShowModal(true);
  }

  useEffect(() => {
    let widthValue = ref.current.scrollWidth;
    console.log("width: ", widthValue);
  }, []);

  function HandleArrow(posterSize) {
    console.log("Windows Size ", window.innerWidth);
    let itemsWin = Math.floor(window.innerWidth / 455);
    console.log("Items that fit Window ", itemsWin);
    console.log("total window", itemsWin * 505);
    console.log("teste ", Math.floor(window.innerWidth / 455) * 455);

    let scrollValue = (ref.current.scrollLeft += posterSize - scrollOffsetLeft);
    if (scrollValue <= 0) {
      setShowArrow(false);
      setScrollOffsetLeft(50);
    } else {
      setShowArrow(true);
      setScrollOffsetLeft(0);
    }
  }

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">{title}</h2>
      <div
        className={`movie-row-left ${showArrow ? "" : "closed"} ${
          largePoster ? "movie-row-left-large" : ""
        } `}
        onClick={() => HandleArrow(Math.floor(-window.innerWidth / -455) * -455)}
      >
        <ArrowBackIosIcon />
      </div>
      <div
        className={`movie-row-right ${largePoster ? "movie-row-right-large" : ""}`}
        onClick={() => HandleArrow(Math.floor(window.innerWidth / 455) * 455)}
      >
        <ArrowForwardIosIcon />
      </div>
      <div ref={ref} className={`movie-row-item ${showArrow ? "hidde" : ""}`}>
        {movieList.map((movie) => (
          <>
            {movie.backdrop_path || movie.poster_path ? (
              <img
                key={movie.id}
                className={`movie-row-poster ${largePoster && "movie-row-poster-large"}`}
                src={`${IMG_URL_LQ}${largePoster ? movie.poster_path : movie.backdrop_path}`}
                onClick={() => OpenModal(movie)}
              />
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
