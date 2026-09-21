//password dikhana ya chupana 
const toggleButtons = document.querySelectorAll(".toggle");

toggleButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
        const inputId = btn.getAttribute("data-target");
        const input = document.getElementById(inputId);

        if(input.type =="password") {
            input.type= "text";
        }
        else{
            input.type= "password";
        }
    });
});

//form aur uske elements pakadna 
const form= document.getElementById("signupForm");
const submitBtn = form.querySelector(".submit");

//yahan backend API ka url lagega
const API_URL = ""; //here API url

form.addEventListener("submit", function(e){
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");

    //pahle sabhi purane error hatado 
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent= "";

    //username check
    if (username == ""){
        usernameError.textContent = "username cannot be empty";
        isValid= false;
    }

    //email check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email == ""){
        emailError.textContent = "Email is required";
        isValid = false;
    }
    else if(!emailPattern.test(email)){
        emailError.textContent= "Enter a val;id email"
    }

    //pasword checking
    if (password == ""){
        passwordError.textContent = "password cannot ber empty";
        isValid = false;
    }
    else if(password.length<6){
        passwordError.textContent= "Password must be at least 6 characters";
        isValid= false;
    }
    //confirm pasword check
    if(confirm == ""){
        confirmError.textContent = "Please confirm your password";
        isValid = false;
    }
    else if(password !== confirm){
        confirmError.textContent= "Password do not match";
        isValid= false;
    }

    //agar koi field invalid hai to idhar hi stop karna hai 
    if(!isValid){
        return;
    }

    //agr sab valid hai to ,tb data API ko bhej dena 
    createAccount(username, email, password);
});

//CALL the API to create the account
function createAccount(username, email,password){
    //button disable kardo jisse user ko lage ki kuch galt hua hai 
    submitBtn.disabled = true;
    submitBtn.textContent= "Creating account...";

    fetch(API_URL, {
        method: "post",
        headers:{
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password

        })
    })
    
}