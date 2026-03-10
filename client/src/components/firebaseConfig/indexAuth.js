// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdtbB768d4ziF8ThscS3colfZNMuZ1DLQ",
  authDomain: "iotmod3.firebaseapp.com",
  databaseURL: "https://iotmod3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotmod3",
  storageBucket: "iotmod3.appspot.com",
  messagingSenderId: "284979884564",
  appId: "1:284979884564:web:3995b8b8a758319e1ced01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;