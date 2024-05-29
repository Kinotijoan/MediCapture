// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDclooVXHRfMe7-tV_WMgkA1TfGevdINN8",
  authDomain: "dailydumps-b6011.firebaseapp.com",
  databaseURL: "https://dailydumps-b6011-default-rtdb.firebaseio.com",
  projectId: "dailydumps-b6011",
  storageBucket: "dailydumps-b6011.appspot.com",
  messagingSenderId: "683688265668",
  appId: "1:683688265668:web:585149db0cb807398a0691",
  measurementId: "G-MKS83D82NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);