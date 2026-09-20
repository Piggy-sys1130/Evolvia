const form = document.getElementById('field');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');

const formError = document.getElementById('form-error');
const togglePassword = document.getElementById('toggle-password');
const forgotPassword = document.getElementById('forgot-password');
const signupLink = document.getElementById('signup-link');


// ==================================================
// SHOW / HIDE PASSWORD
// ==================================================

togglePassword.addEventListener('click', function () {

    if (passwordInput.type === 'password') {

        passwordInput.type = 'text';
        togglePassword.textContent = '🙈';

        togglePassword.setAttribute(
            'aria-label',
            'Hide password'
        );

        togglePassword.setAttribute(
            'aria-pressed',
            'true'
        );

    } else {

        passwordInput.type = 'password';
        togglePassword.textContent = '👁️';

        togglePassword.setAttribute(
            'aria-label',
            'Show password'
        );

        togglePassword.setAttribute(
            'aria-pressed',
            'false'
        );
    }
});


// ==================================================
// CLEAR ERRORS
// ==================================================

function clearErrors() {

    usernameError.textContent = '';
    passwordError.textContent = '';
    formError.textContent = '';

    usernameError.classList.remove('visible');
    passwordError.classList.remove('visible');
    formError.classList.remove('visible');
}


// ==================================================
// VALIDATE LOGIN FORM
// ==================================================

function validateForm() {

    let isValid = true;

    clearErrors();

    // Username validation
    const username = usernameInput.value.trim();

    if (username === '') {

        usernameError.textContent =
            'Please enter your username or email.';

        usernameError.classList.add('visible');

        isValid = false;
    }


    // Password validation
    const password = passwordInput.value;

    if (password === '') {

        passwordError.textContent =
            'Please enter your password.';

        passwordError.classList.add('visible');

        isValid = false;

    } else if (password.length < 6) {

        passwordError.textContent =
            'Password must be at least 6 characters.';

        passwordError.classList.add('visible');

        isValid = false;
    }

    return isValid;
}


// ==================================================
// LOGIN + BACKEND API
// ==================================================

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    // Validate form
    if (!validateForm()) {
        return;
    }


    // Get username and password
    const username = usernameInput.value.trim();
    const password = passwordInput.value;


    // Clear previous form error
    formError.textContent = '';
    formError.classList.remove('visible');


    try {

        // Connect to Flask backend
        const response = await fetch('https://feline-comrade-stride.ngrok-free.dev/api/login', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );


        const data = await response.json();


        // ==================================================
        // LOGIN SUCCESS
        // ==================================================

        if (response.ok) {

            console.log('Login successful');
            console.log(data);


            // Save JWT token
            localStorage.setItem(
                'token',
                data.token
            );


            // Save user information
            localStorage.setItem(
                'user',
                JSON.stringify(data.user)
            );


            formError.textContent =
                'Login successful!';

            formError.classList.add('visible');


            console.log(
                'Token saved successfully'
            );

            console.log(
                'Logged in user:',
                data.user
            );


            // Dashboard redirect
            // Abhi dashboard file ka exact naam confirm nahi hai,
            // isliye ise baad me enable karenge.

            // window.location.href = 'dashboard.html';
        }


        // ==================================================
        // LOGIN FAILED
        // ==================================================

        else {

            formError.textContent =
                data.error ||
                'Invalid username or password';

            formError.classList.add('visible');
        }

    }


    // ==================================================
    // BACKEND CONNECTION ERROR
    // ==================================================

    catch (error) {

        console.error(
            'API Error:',
            error
        );

        formError.textContent =
            'Unable to connect to the server. Make sure the backend is running.';

        formError.classList.add('visible');
    }

});


// ==================================================
// REMOVE USERNAME ERROR WHILE TYPING
// ==================================================

usernameInput.addEventListener(
    'input',
    function () {

        usernameError.textContent = '';

        usernameError.classList.remove(
            'visible'
        );
    }
);


// ==================================================
// REMOVE PASSWORD ERROR WHILE TYPING
// ==================================================

passwordInput.addEventListener(
    'input',
    function () {

        passwordError.textContent = '';

        passwordError.classList.remove(
            'visible'
        );
    }
);


// ==================================================
// FORGOT PASSWORD
// ==================================================

forgotPassword.addEventListener(
    'click',
    function (event) {

        event.preventDefault();

        formError.textContent =
            'Password recovery will be added later.';

        formError.classList.add(
            'visible'
        );
    }
);


// ==================================================
// SIGN UP
// ==================================================

signupLink.addEventListener(
    'click',
    function (event) {

        event.preventDefault();

        formError.textContent =
            'Sign-up page will be added later.';

        formError.classList.add(
            'visible'
        );
    }
);