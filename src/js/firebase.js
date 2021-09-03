import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { updateMenuUI } from "./ui";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDXTp9IAyK9WV8yc9pmHsCF1eh9iaBmIM0",
  authDomain: "fir-9a839.firebaseapp.com",
  projectId: "fir-9a839",
  storageBucket: "fir-9a839.appspot.com",
  messagingSenderId: "468446489307",
  appId: "1:468446489307:web:6ae0817776a98cb5a2bafe",
  measurementId: "G-MX6V5M5J1B"
});
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// function that sets a real time listener for auth state change
const checkAuthentication = () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("logged in");
      updateMenuUI("login");
    } else {
      console.log("logged out");
      updateMenuUI();
    }
  })
};

// function that takes email and password given and creates new user
const createUser = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => console.log(cred))
    .catch(err => console.log(err))
};

const loginUser = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => console.log(cred))
    .catch(err => console.log(err))
};

export { checkAuthentication, createUser };