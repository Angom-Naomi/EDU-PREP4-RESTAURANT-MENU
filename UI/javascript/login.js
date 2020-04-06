function login(){
    var username = document.getElementById("name").value; //capture the user name value a user enters
    var pw = document.getElementById("password").value; //capture the password value a user enters
    var pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{8,}$/; //regex for a strong password

    if (username === " " || pw === "") {
        alert("Please fill out all fields...");
        return false;
    } 
    
    else if(!(pw.match(pwFormat))){
        alert("Password must have 8 characters, atleast 1 lowercase and uppercase letter, and 1 special character")
        return false;
    }

    else {
        alert("Successfull Log In...");
        window.location.href="menu.html";    //redirects to next page (menu) after successful Log in
    }
};
