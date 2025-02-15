// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgPkXTaxVViqPIj-qxho84oBezYGE0z4U",
  authDomain: "trip-planner-15fad.firebaseapp.com",
  projectId: "trip-planner-15fad",
  storageBucket: "trip-planner-15fad.firebasestorage.app",
  messagingSenderId: "527991495104",
  appId: "1:527991495104:web:44198c5a57b04e17509025",
  measurementId: "G-58LBL319X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);