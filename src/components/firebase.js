import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS_-5locCfvt_OCgWbkGs-CIi2l09HtVo",
  authDomain: "registrations-53e54.firebaseapp.com",
  projectId: "registrations-53e54",
  storageBucket: "registrations-53e54.appspot.com",
  messagingSenderId: "757939425442",
  appId: "1:757939425442:android:7ec64f560483f99ea207fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
