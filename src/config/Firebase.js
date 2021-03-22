import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import { FIREBASE_API } from "./ENV";

var firebaseConfig = {
  apiKey: { FIREBASE_API },
  authDomain: "utu-atl.firebaseapp.com",
  projectId: "utu-atl",
  storageBucket: "utu-atl.appspot.com",
  messagingSenderId: "103736265612",
  appId: "1:103736265612:web:932fa5094fa760922424a9",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
