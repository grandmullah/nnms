// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbP_3ARU3976dRPnyWFPIfx6uOWFh9Iw4",
  authDomain: "collins2-cd213.firebaseapp.com",
  projectId: "collins2-cd213",
  storageBucket: "collins2-cd213.appspot.com",
  messagingSenderId: "1075547441747",
  appId: "1:1075547441747:web:4b3ceec6d1810a320714a6",
  measurementId: "G-SSMNKXGX9P",
  databaseURL:"https://collins2-cd213-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
// getAnalytics(app);