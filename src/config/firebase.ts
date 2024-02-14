// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlWpzlg8l81t3e5i1SauGO4K3te2Uke1I",
  authDomain: "messenger-clone-9132b.firebaseapp.com",
  projectId: "messenger-clone-9132b",
  storageBucket: "messenger-clone-9132b.appspot.com",
  messagingSenderId: "738491863799",
  appId: "1:738491863799:web:e644deef9b827a2a7ef9f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const db = getFirestore(app)

const auth = getAuth(app)

const provide = new GoogleAuthProvider();

export {db, auth, provide};
 
