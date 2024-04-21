// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  // apiKey: "AIzaSyCLQ8tVALs63g260FxCxWjoOZdy5r40gK0",
  authDomain: "mern-app-5-hours.firebaseapp.com",
  projectId: "mern-app-5-hours",
  storageBucket: "mern-app-5-hours.appspot.com",
  messagingSenderId: "225921893624",
  appId: "1:225921893624:web:0ad5875c647a53f5d9270d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
