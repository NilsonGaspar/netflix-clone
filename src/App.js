import "./App.css";
import MovieRow from "./components/MovieRow";
import HandleRequests from "./HandleRequests";
import FeaturedMovie from "./components/FeaturedMovie";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import ModalScreen from "./components/ModalScreen";

import { auth } from "./Firebase";

function App() {
  const [getMovie, setGetMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const [handleShowNav, setHandleShowNav] = useState(false);
  // Login
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser("");
        }
      });
    };
    authListener();
  }, []);

  const CleanInputs = () => {
    setEmail("");
    setPassword("");
  };

  const HandleLogOut = () => {
    auth.signOut();
  };

  return (
    <div className={`app ${showModal ? "active" : ""}`}>
      {user ? (
        <>
          <ModalScreen
            showModal={showModal}
            setShowModal={setShowModal}
            getMovie={getMovie}
            setGetMovie={setGetMovie}
            videoKey={videoKey}
            setVideoKey={setVideoKey}
          />
          <Nav
            handleShowNav={handleShowNav}
            setHandleShowNav={setHandleShowNav}
            HandleLogOut={HandleLogOut}
          />
          <FeaturedMovie
            handleShowNav={handleShowNav}
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            videoKey={videoKey}
            setVideoKey={setVideoKey}
            title="Netflix Originals"
            fetchURL={HandleRequests.NetflixOriginals}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Netflix Originals"
            fetchURL={HandleRequests.NetflixOriginals}
            largePoster
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Trending Now"
            fetchURL={HandleRequests.TrendingNow}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Top Rated"
            fetchURL={HandleRequests.TopRated}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Popular"
            fetchURL={HandleRequests.TrendingNow}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Action Movies"
            fetchURL={HandleRequests.ActionMovies}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Romance Movies"
            fetchURL={HandleRequests.RomanceMovies}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Horror Movies"
            fetchURL={HandleRequests.HorrorMovies}
          />
          <MovieRow
            setGetMovie={setGetMovie}
            setShowModal={setShowModal}
            title="Comedy Movies"
            fetchURL={HandleRequests.ComedyMovies}
          />
        </>
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          setError={setError}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
        />
      )}
    </div>
  );
}

export default App;
