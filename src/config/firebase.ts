// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_u-dPDSU0KD0Uw-k86NNlNDFsz7E84h8",
  authDomain: "reactblogpractice.firebaseapp.com",
  projectId: "reactblogpractice",
  storageBucket: "reactblogpractice.appspot.com",
  messagingSenderId: "680414173113",
  appId: "1:680414173113:web:1241ebbe5b9f733baa4868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)