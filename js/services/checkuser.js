
function check_user(role){
    console.log(role);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var luser = JSON.stringify(user);
            localStorage.setItem("user", luser);

            if(role == "admin"){
                window.location = "admin/home.html";
            }
<<<<<<< HEAD
            else{
=======
            else if(role=="faculty"){
>>>>>>> 485827d70a92a30683fbfb2287f60654b006eb3f
                window.location = 'faculty/home.html';
            }

        } else {
            localStorage.removeItem("user");
            console.log("no User is signed in.");
        }
    });
}

