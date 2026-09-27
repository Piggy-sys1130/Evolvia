// ========================================
// EVOLVIA BACKEND URL
// ========================================

const API_BASE_URL = "https://Bhavishyajoshi07.pythonanywhere.com/api/login";


// ========================================
// ELEMENTS
// ========================================

const form = document.getElementById("field");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");

const formError = document.getElementById("form-error");

const togglePassword = document.getElementById("toggle-password");
const forgotPassword = document.getElementById("forgot-password");
const signupLink = document.getElementById("signup-link");


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

        togglePassword.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁️";

        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );

        togglePassword.setAttribute(
            "aria-pressed",
            "false"
        );
    }
});


// ========================================
// CLEAR ERRORS
// ========================================

function clearErrors() {

    usernameError.textContent = "";
    passwordError.textContent = "";
    formError.textContent = "";

    usernameError.classList.remove("visible");
    passwordError.classList.remove("visible");
    formError.classList.remove("visible");
}


// ========================================
// VALIDATION
// ========================================

function validateForm() {

    let isValid = true;

    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "") {

        usernameError.textContent =
            "Please enter your username or email.";

        usernameError.classList.add("visible");

        isValid = false;
    }

    if (password === "") {

        passwordError.textContent =
            "Please enter your password.";

        passwordError.classList.add("visible");

        isValid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        passwordError.classList.add("visible");

        isValid = false;
    }

    return isValid;
}


// ========================================
// LOGIN
// ========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    formError.textContent = "";
    formError.classList.remove("visible");

    try {

        console.log("Sending login request...");
        console.log(
            "API URL:",
            `${API_BASE_URL}/api/login`
        );

        const response = await fetch(
            `${API_BASE_URL}/api/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );

        // Check whether server returned JSON
        const contentType =
            response.headers.get("content-type") || "";

        let data;

        if (contentType.includes("application/json")) {

            data = await response.json();

        } else {

            const text = await response.text();

            console.error(
                "Server returned non-JSON:",
                text
            );

            throw new Error(
                `Server returned ${response.status} instead of JSON.`
            );
        }


        // ========================================
        // SUCCESS
        // ========================================

        if (response.ok) {

            console.log("Login successful!");
            console.log("User:", data.user);

            // Save JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            formError.textContent =
                "Login successful!";

            formError.classList.add("visible");

            console.log(
                "Token saved successfully."
            );

            // Dashboard ready hone ke baad:
            // window.location.href = "dashboard.html";

        }


        // ========================================
        // LOGIN FAILED
        // ========================================

        else {

            formError.textContent =
                data.error ||
                "Invalid username or password.";

            formError.classList.add("visible");
        }

    }


    // ========================================
    // NETWORK / SERVER ERROR
    // ========================================

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        console.error(
            "API URL:",
            `${API_BASE_URL}/api/login`
        );

        formError.textContent =
            error.message ||
            "Unable to connect to the server.";

        formError.classList.add("visible");
    }
});


// ========================================
// REMOVE USERNAME ERROR
// ========================================

usernameInput.addEventListener(
    "input",
    function () {

        usernameError.textContent = "";

        usernameError.classList.remove(
            "visible"
        );
    }
);


// ========================================
// REMOVE PASSWORD ERROR
// ========================================

passwordInput.addEventListener(
    "input",
    function () {

        passwordError.textContent = "";

        passwordError.classList.remove(
            "visible"
        );
    }
);


// ========================================
// FORGOT PASSWORD
// ========================================

forgotPassword.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        formError.textContent =
            "Password recovery will be added later.";

        formError.classList.add("visible");
    }
);


// ========================================
// SIGN UP
// ========================================

signupLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        formError.textContent =
            "Sign-up page will be added later.";

        formError.classList.add("visible");
    }
);