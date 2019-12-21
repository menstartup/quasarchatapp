import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyCqjVK6IDUJONgqRmigMtHyw9qOPDuaKDk",
  authDomain: "smackchat-6fbe0.firebaseapp.com",
  databaseURL: "https://smackchat-6fbe0.firebaseio.com",
  projectId: "smackchat-6fbe0",
  storageBucket: "smackchat-6fbe0.appspot.com",
  messagingSenderId: "397358065222",
  appId: "1:397358065222:web:6c330ceaaf40cc6a714c47",
  measurementId: "G-7GW73YKLP8"
};
let firebaseApp =  firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }