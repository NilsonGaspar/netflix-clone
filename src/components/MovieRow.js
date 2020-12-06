import React, { useState, useEffect, useRef } from "react";
import "./MovieRow.css";
import HandleRequests from "../HandleRequests";

// icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function MovieRow({ title, fetchURL, largePoster, setGetMovie, setShowModal }) {
  const IMG_URL_LQ = "https://image.tmdb.org/t/p/w500";
  //const IMG_URL_HQ = "https://image.tmdb.org/t/p/original";

  const [movieList, setMovieList] = useState([]);
  //const [scrollX, setMovieList] = useState([]);

  const [showArrow, setShowArrow] = useState(false);

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

  function HandleArrow(scrollOffset) {
    console.log("Windows Size ", window.innerWidth);
    let itemsWin = Math.floor(window.innerWidth / 455);
    console.log("Items that fit Window ", itemsWin);
    console.log("total window", itemsWin * 505);
    console.log("teste ", Math.floor(window.innerWidth / 455) * 455);

    let scrollValue = (ref.current.scrollLeft += scrollOffset);
    if (scrollValue <= 0) {
      setShowArrow(false);
    } else {
      setShowArrow(true);
    }
  }

  return (
    <div className="movie__row">
      <h2 className="movie__row__title">{title}</h2>
      <div
        className={`movie__row__left ${showArrow ? "" : "Closed"} ${
          largePoster ? "movie__row__left-large" : ""
        } `}
        onClick={() => HandleArrow(Math.floor(-window.innerWidth / -455) * -455)}
      >
        <ArrowBackIosIcon />
      </div>
      <div
        className={`movie__row__right ${largePoster ? "movie__row__right__large" : ""}`}
        onClick={() => HandleArrow(Math.floor(window.innerWidth / 455) * 455)}
      >
        <ArrowForwardIosIcon />
      </div>
      <div ref={ref} className={`movie__row__item ${showArrow ? "hidde" : ""}`}>
        {movieList.map((movie) => (
          <>
            {movie.backdrop_path || movie.poster_path ? (
              <img
                key={movie.id}
                className={`movie__row__poster ${largePoster && "movie__row__poster__large"}`}
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
