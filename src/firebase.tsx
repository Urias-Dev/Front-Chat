// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
//  https://firebase.google.com/docs/web/setup#available-libraries


import   { getAuth  }  from   "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQYj73T5UEBBamvXTrxvAIWepeqtJCSqQ",
    authDomain: "chat-ionic-802fd.firebaseapp.com",
    projectId: "chat-ionic-802fd",
    storageBucket: "chat-ionic-802fd.appspot.com",
    messagingSenderId: "527096150907",
    appId: "1:527096150907:web:54bbe7520785784b1f1bde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)