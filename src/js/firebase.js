import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDXTp9IAyK9WV8yc9pmHsCF1eh9iaBmIM0",
  authDomain: "fir-9a839.firebaseapp.com",
  projectId: "fir-9a839",
  storageBucket: "fir-9a839.appspot.com",
  messagingSenderId: "468446489307",
  appId: "1:468446489307:web:6ae0817776a98cb5a2bafe",
  measurementId: "G-MX6V5M5J1B"
})

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const checkAuthentication = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log("logged in");
    } else {
      console.log("logged out");
    }
  })
};

export { checkAuthentication };