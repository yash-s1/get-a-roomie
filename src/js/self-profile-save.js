import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { collection, getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js"

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("show-user-email").innerText = user.email;

        getDoc(doc(db, "profiles", user.email)).then(docSnap => {
            document.getElementById("main-name-fetch").innerHTML = docSnap.data().name;
            document.getElementById("profession-fetch").innerHTML = docSnap.data().profession;
            document.getElementById("show-user-about").innerHTML = docSnap.data().about;
            document.getElementById("show-user-name").innerHTML = docSnap.data().name;
            document.getElementById("show-user-phone").innerHTML = docSnap.data().phone;
            document.getElementById("show-user-prof").innerHTML = docSnap.data().profession;
            document.getElementById("show-user-interest").innerHTML = docSnap.data().interest;
        });

    }
    else {
        location.replace("index.html");
    }
});

document.getElementById("edit-profile-btn").addEventListener("click", (event) => {
    document.getElementById("edit-profile-btn").style.display = 'none';
    document.getElementById("show-user-about").style.display = 'none';
    document.getElementById("show-user-name").style.display = 'none';
    document.getElementById("show-user-phone").style.display = 'none';
    document.getElementById("show-user-prof").style.display = 'none';
    document.getElementById("show-user-interest").style.display = 'none';
    document.getElementById("show-user-email").style.display = 'none';

    document.getElementById("about-txt").style.display = 'none';
    document.getElementById("name-txt").style.display = 'none';
    document.getElementById("phone-txt").style.display = 'none';
    document.getElementById("prof-txt").style.display = 'none';
    document.getElementById("interest-txt").style.display = 'none';
    document.getElementById("email-txt").style.display = 'none';

    document.getElementById("field-1").style.display = 'block';
    document.getElementById("field-2").style.display = 'block';
    document.getElementById("field-3").style.display = 'block';
    document.getElementById("field-4").style.display = 'block';
    document.getElementById("field-5").style.display = 'block';

    document.getElementById("save-profile-btn").style.display = 'block';

    onAuthStateChanged(auth, (user) => {
        if (user) {
            getDoc(doc(db, "profiles", user.email)).then(docSnap => {
                document.getElementById("input-aboutme").value = docSnap.data().about;
                document.getElementById("input-name").value = docSnap.data().name;
                document.getElementById("input-phone").value = docSnap.data().phone;
                document.getElementById("input-profession").value = docSnap.data().profession;
                document.getElementById("input-interests").value = docSnap.data().interest;
            });
        }
    });

});

document.getElementById("save-profile-btn").addEventListener("click", (event) => {

    const in_about = document.getElementById("input-aboutme").value;
    const in_name = document.getElementById("input-name").value;
    const in_phone = document.getElementById("input-phone").value;
    const in_profession = document.getElementById("input-profession").value;
    const in_interest = document.getElementById("input-interests").value;

    if (in_phone === "" || in_about === "" || in_name === "" || in_profession === "" || in_interest === "") {
        window.alert("Fill all the fields!");
        return;
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            try {
                const docRef = setDoc(doc(db, "profiles", user.email), {
                    name: in_name,
                    phone: in_phone,
                    profession: in_profession,
                    interest: in_interest,
                    about: in_about,
                });

                document.getElementById("loader-div").style.display = 'block';
                document.getElementById("body").style.display = 'none';

                setTimeout(function(){
                    location.reload();
                }, 3000);
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    });
});
