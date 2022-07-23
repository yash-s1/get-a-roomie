import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"

const auth = getAuth();
const db = getFirestore();
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

document.getElementById("btn-login").addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;

    if (email.match(validRegex)) {
        if (!(pass.length < 6)) {
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    const user = userCredential.user;
                    document.getElementById("alert-login").style.display = 'none';
                })
                .catch((error) => {
                    setAlertOnLogin(error.code);
                });
        }
        else setAlertOnLogin('Password length should be more than 6');
    }
    else setAlertOnLogin('Email is Invalid!');
});

document.getElementById("btn-signup").addEventListener("click", (event) => {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const pass = document.getElementById("signup-password").value;

    if (email.match(validRegex)) {
        if (!(pass.length<6)) {
            createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    document.getElementById("alert-signup").style.display = 'none';
                    saveToDatabase(email);
                })
                .catch((error) => {
                    setAlertOnSignup(error.code);
                });
        }
        else setAlertOnSignup('Password length should be more than 6');
    }
    else setAlertOnSignup('Email is Invalid!');
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("forms-div").style.display = 'none';
        document.getElementById("loader-div").style.display = 'block';
        setTimeout(function(){
            location.replace("landing.html");
        }, 3000);
    }
});

function setAlertOnLogin(alertMessage) {
    document.getElementById("alert-login").style.display = 'block';
    document.getElementById("alert-login").innerHTML = alertMessage;
}

function setAlertOnSignup(alertMessage) {
    document.getElementById("alert-signup").style.display = 'block';
    document.getElementById("alert-signup").innerHTML = alertMessage;
}

function saveToDatabase(email) {
    try {
        setDoc(doc(db, "profiles", email), {
            name: "none",
            phone: "none",
            profession: "none",
            interest: "none",
            about: "none",
        });
        console.log("document added!")
    }
    catch (e) {
        console.error("Error adding document: ", e);
    }
}