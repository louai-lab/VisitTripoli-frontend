import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDguXHgHDsk7ARHaptWOqHSjfxFp_RXJpA",
  authDomain: "visittripoli-70c52.firebaseapp.com",
  projectId: "visittripoli-70c52",
  storageBucket: "visittripoli-70c52.appspot.com",
  messagingSenderId: "501007874586",
  appId: "1:501007874586:web:c09b26cb53759f45562fa3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);