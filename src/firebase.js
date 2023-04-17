// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcay2AmKBp2OOhFhJHlmH8mBKrhTo5Zxg",
  authDomain: "englishapp-5be82.firebaseapp.com",
  projectId: "englishapp-5be82",
  storageBucket: "englishapp-5be82.appspot.com",
  messagingSenderId: "721677630361",
  appId: "1:721677630361:web:d8ccda637c863dbd25f108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;