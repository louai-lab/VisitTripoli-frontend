// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn_TNoWkgCe1NDNi6YvU0sIUwc2XCt2_o",
  authDomain: "auth-86784.firebaseapp.com",
  projectId: "auth-86784",
  storageBucket: "auth-86784.appspot.com",
  messagingSenderId: "490707287666",
  appId: "1:490707287666:web:d6c6befccdf8e27b4c8ceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);