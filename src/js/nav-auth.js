import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

const auth = getAuth();

document.getElementById('logout-btn-nav').addEventListener("click", (event) => {
    auth.signOut();
});

onAuthStateChanged(auth, (user) => {
    if (user) {
    }
    else {
        location.replace("index.html");
    }
});