// Code for 'create account' button
function createAccount(){
        var username = document.getElementById("name").value; //capture the user name value a user enters
        var useremail = document.getElementById("email").value; //capture the email value a user enters
        var pw = document.getElementById("password").value; //capture the password value a user enters
        var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regex format for emails
        var pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/; //regex for a strong password
   

        // function approval(){ 
        if (username === " " || useremail === "") {
            alert("Please fill out all fields...");
            return false;
        } 
        else if (!(useremail.match(emailFormat))){
            alert("Your Email is invalid...");
            return false;
        }
        else if(!(pw.match(pwFormat))){
            alert("Password must have 8 characters, atleast 1 lowercase and uppercase letter, and 1 special character")
            return false;
        }

        else {
            alert("Your account has been created successfully......");
            document.getElementById("acc").submit(); 
            window.location.href="../menu.html";
            return true;
            
        }

};


