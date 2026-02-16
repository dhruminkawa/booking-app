// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLKhMI3j0g06G_fYMHBwxMWUNvup3d0Ms",
  authDomain: "booking-app-45752.firebaseapp.com",
  projectId: "booking-app-45752",
  storageBucket: "booking-app-45752.firebasestorage.app",
  messagingSenderId: "271356449073",
  appId: "1:271356449073:web:465e4cb045c4f2ac8a6010",
  measurementId: "G-W8E5MEQHTJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);   