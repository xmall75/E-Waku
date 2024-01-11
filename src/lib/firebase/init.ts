// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBxoxa_af7JpzJU7DwCLsu8o_yGOgUNkE",
  authDomain: "e-waku.firebaseapp.com",
  databaseURL: "https://e-waku-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-waku",
  storageBucket: "e-waku.appspot.com",
  messagingSenderId: "658885834643",
  appId: "1:658885834643:web:2aa4ea79c49851442f5a66",
  measurementId: "G-9DJX3395MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app