import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAgPkXTaxVViqPIj-qxho84oBezYGE0z4U",
  authDomain: "trip-planner-15fad.firebaseapp.com",
  projectId: "trip-planner-15fad",
  storageBucket: "trip-planner-15fad.firebasestorage.app",
  messagingSenderId: "527991495104",
  appId: "1:527991495104:web:44198c5a57b04e17509025",
  measurementId: "G-58LBL319X1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(auth);


export { auth, db, googleProvider };