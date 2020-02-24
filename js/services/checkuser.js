
function check_user(role){
    console.log(role);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var luser = JSON.stringify(user);
            localStorage.setItem("user", luser);

            if(role == "admin"){
                window.location = "admin/home.html";
            }
            else if(role == "faculty"){
                window.location = 'faculty/home.html';
            }

        } else {
            localStorage.removeItem("user");
            console.log("no User is signed in.");
        }
    });
}


// infytq descussions