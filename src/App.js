import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import MovieRow from "./components/MovieRow";
import HandleRequests from "./HandleRequests";
import FeaturedMovie from "./components/FeaturedMovie";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import ModalScreen from "./components/ModalScreen";
import Home from "./components/HomeScreen";
import { auth } from "./Firebase";
import UseAuthListener from "./components/UseAuthListener";
import Login from "./components/Login";
import { RedirectUser, ProtectedRoute } from "./components/Routes";

function App() {
  const { user } = UseAuthListener();
  const [getMovie, setGetMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const [showNav, setShowNav] = useState(false);

  const HandleLogOut = () => {
    auth.signOut();
  };

  return (
    <Router>
      <div className="app">
        <Switch>
          <RedirectUser user={user} loggedInPath="/browse" path="/login">
            <Login />
          </RedirectUser>
          <RedirectUser user={user} loggedInPath="/browse" path="/signup">
            <Signup />
          </RedirectUser>
          <ProtectedRoute user={user} path="/browse">
            <Nav showNav={showNav} setShowNav={setShowNav} HandleLogOut={HandleLogOut} />
            <ModalScreen
              showModal={showModal}
              setShowModal={setShowModal}
              getMovie={getMovie}
              setGetMovie={setGetMovie}
              videoKey={videoKey}
              setVideoKey={setVideoKey}
            />
            <FeaturedMovie
              showNav={showNav}
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
          </ProtectedRoute>
          <RedirectUser user={user} loggedInPath="/browse" path="/">
            <Login />
          </RedirectUser>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
