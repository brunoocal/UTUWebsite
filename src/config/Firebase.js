import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/firebase-analytics";
import { FIREBASE_API } from "./ENV";

var firebaseConfig = {
  apiKey: `${FIREBASE_API}`,
  authDomain: "utu-atl.firebaseapp.com",
  databaseURL: "https://utu-atl-default-rtdb.firebaseio.com",
  projectId: "utu-atl",
  storageBucket: "utu-atl.appspot.com",
  messagingSenderId: "103736265612",
  appId: "1:103736265612:web:932fa5094fa760922424a9",
  measurementId: "G-VZDNVR588G",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
