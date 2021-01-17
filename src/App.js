import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { RedirectUser, ProtectedRoute } from "./components/Routes";
import MovieRow from "./components/MovieRow";
import HandleRequests from "./HandleRequests";
import FeaturedMovie from "./components/FeaturedMovie";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import { useState, useMemo } from "react";
import ModalScreen from "./components/ModalScreen";
import Home from "./components/HomeScreen";
import { auth } from "./Firebase";
import UseAuthListener from "./components/UseAuthListener";
import Login from "./components/Login";
import Loader from "./components/Loader";
import SelectProfile from "./components/SelectProfile";
import ProfileScreen from "./components/ProfileScreen";
import { ModalContext, GetMovieContext } from "./components/UseContext";

function App() {
  const { user } = UseAuthListener();
  const [getMovie, setGetMovie] = useState();
  const [showModal, setShowModal] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const [showNav, setShowNav] = useState(false);
  const [profile, setProfile] = useState(true);
  const [loading, setLoading] = useState(true);

  const ModalMemo = useMemo(() => ({ showModal, setShowModal }), [showModal, setShowModal]);
  const GetMovieMemo = useMemo(() => ({ getMovie, setGetMovie }), [getMovie, setGetMovie]);

  console.log(user);
  console.log(profile);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, [profile.displayName]);

  const HandleLogOut = () => {
    auth.signOut();
  };

  return (
    <>
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
              {profile ? (
                <ModalContext.Provider value={ModalMemo}>
                  <GetMovieContext.Provider value={GetMovieMemo}>
                    <Nav showNav={showNav} setShowNav={setShowNav} HandleLogOut={HandleLogOut} />
                    <ModalScreen videoKey={videoKey} setVideoKey={setVideoKey} />
                    <FeaturedMovie
                      showNav={showNav}
                      videoKey={videoKey}
                      setVideoKey={setVideoKey}
                      title="Netflix Originals"
                      url={HandleRequests.NetflixOriginals}
                    />
                    <MovieRow
                      title="Netflix Originals"
                      url={HandleRequests.NetflixOriginals}
                      largePoster
                    />
                    <MovieRow title="Trending Now" url={HandleRequests.TrendingNow} />
                    <MovieRow title="Top Rated" url={HandleRequests.TopRated} />
                    <MovieRow title="Popular" url={HandleRequests.TrendingNow} />
                    <MovieRow title="Action Movies" url={HandleRequests.ActionMovies} />
                    <MovieRow title="Romance Movies" url={HandleRequests.RomanceMovies} />
                    <MovieRow title="Horror Movies" url={HandleRequests.HorrorMovies} />
                    <MovieRow title="Comedy Movies" url={HandleRequests.ComedyMovies} />
                  </GetMovieContext.Provider>
                </ModalContext.Provider>
              ) : (
                <SelectProfile user={user} setProfile={setProfile} />
              )}
            </ProtectedRoute>
            <RedirectUser user={user} loggedInPath="/browse" path="/">
              <Login />
            </RedirectUser>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
