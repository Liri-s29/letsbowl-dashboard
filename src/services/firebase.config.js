import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCv6uIrdrYmoebhskmi9l89YA4A09egGwo",
  authDomain: "letsbowl-website.firebaseapp.com",
  projectId: "letsbowl-website",
  storageBucket: "letsbowl-website.appspot.com",
  messagingSenderId: "702905206793",
  appId: "1:702905206793:web:0d8809feec3ae43612d0d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
