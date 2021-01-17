import firestore from "./Firebase";

const API_KEY = "API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "&language=en-GB";
const END_POINT = `api_key=${API_KEY}${LANGUAGE}`;

export default {
  NetflixOriginals: `${BASE_URL}/discover/tv?with_networks=213&`,
  TrendingNow: `${BASE_URL}/trending/all/week?`,
  TopRated: `${BASE_URL}/movie/top_rated?`,
  Popular: `${BASE_URL}/movie/popular?`,
  ActionMovies: `${BASE_URL}/discover/movie?with_genres=28&`,
  HorrorMovies: `${BASE_URL}/discover/movie??with_genres=27&`,
  RomanceMovies: `${BASE_URL}/discover/movie?with_genres=10749&`,
  ComedyMovies: `${BASE_URL}/discover/movie?with_genres=99&`,

  FetchData: async (url) => {
    const request = await fetch(`${url}${END_POINT}`);
    const response = await request.json();
    return response;
  },

  HandleLongText(str, num) {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num) + "...";
  },

  SaveUser: async (user) => {
    const { uid, displayName, photoURL, email } = user;
    await firestore.collection("user").doc(uid).set({
      uid,
      displayName,
      photoURL,
      email,
    });
  },

  SaveProfile: async (user) => {
    await firestore
      .collection("user")
      .doc(user.uid)
      .collection("profiles")
      .doc(user.displayName)
      .set({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
  },

  UpdateUserDetails: async (user, userName, userAvatarURL) => {
    await firestore.collection("user").doc(user.uid).collection("profiles").doc(userName).set({
      userName: userName,
      avatar: userAvatarURL,
    });
    await firestore.collection("user").doc(user.uid).set(
      {
        userName: userName,
        avatar: userAvatarURL,
      },
      { merge: true }
    );
  },

  NewProfile: async (user, userName, userAvatarURL) => {
    await firestore.collection("user").doc(user.uid).collection("profiles").doc(userName).set({
      userName: userName,
      avatar: userAvatarURL,
    });
  },
};
