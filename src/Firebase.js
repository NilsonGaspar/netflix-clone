import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDzSchGRaS1vjUMDNplVswrrBhHT2RNt3I",
  authDomain: "netflix-clone-3fc90.firebaseapp.com",
  projectId: "netflix-clone-3fc90",
  storageBucket: "netflix-clone-3fc90.appspot.com",
  messagingSenderId: "16435101039",
  appId: "1:16435101039:web:6271e1addebb1ae007bc9a",
  measurementId: "G-LWZ74F79MK",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebaseApp.firestore();

export { auth };
export default firestore;
