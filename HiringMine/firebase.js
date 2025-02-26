import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwmt95xfX7AATV9B17ue5FmFcjK7402OE",
  authDomain: "hiringmineapp.firebaseapp.com",
  projectId: "hiringmineapp",
  storageBucket: "hiringmineapp.firebasestorage.app",
  messagingSenderId: "739955915899",
  appId: "1:739955915899:web:cfcdc1d740eda722a6f6de",
};

// **Initialize Firebase**
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  signInWithEmailAndPassword,
};
