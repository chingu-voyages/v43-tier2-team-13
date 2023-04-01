// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZom64UGQVE98VSCQRDmnH6XSl1vgGgeY",
  authDomain: "cryptoworld-fbdf7.firebaseapp.com",
  databaseURL: "https://cryptoworld-fbdf7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cryptoworld-fbdf7",
  storageBucket: "cryptoworld-fbdf7.appspot.com",
  messagingSenderId: "541224668441",
  appId: "1:541224668441:web:fe82b8ddc60c5462470988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const cryptoWorldDB = ref(db, "cryptoWorld")

export { auth, db, cryptoWorldDB }