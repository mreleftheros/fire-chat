import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp, onSnapshot, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

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

// AUTH

// function that takes email and password given and creates new user
const signUpUser = async (email, password, displayName) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      return updateProfile(auth.currentUser, {displayName: displayName});
    })
    .catch(err => console.log(err));
};

// function that takes email and password given and logins user
const loginUser = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => console.log(cred.user))
    .catch(err => console.log(err))
};

// function that logouts user
const logoutUser = async () => {
  signOut(auth)
    .catch(err => console.log(err))
};

// FIRESTORE

// function that takes parameters from the chatForm and adds new object to the database
const addMessage = async (name, chatroom, message) => {
  let time = Timestamp.fromDate(new Date());
  await addDoc(collection(db, "messages"), {
    name,
    chatroom,
    message,
    time
  })
    .catch(err => console.log(err));
};

// const getMessages = () => {
//   const unsub = onSnapshot()
// }

export { auth, onAuthStateChanged, signUpUser, loginUser, logoutUser, updateProfile, addMessage };