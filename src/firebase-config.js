import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4xxQqVfALKoe0elw1dspDosGMfXlfJnw",
    authDomain: "get-a-roomie.firebaseapp.com",
    projectId: "get-a-roomie",
    storageBucket: "get-a-roomie.appspot.com",
    messagingSenderId: "599893769889",
    appId: "1:599893769889:web:757584b562f1658a63bae0",
    measurementId: "G-K6B7R9Q3GC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


