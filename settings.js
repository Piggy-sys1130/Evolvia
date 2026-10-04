//Evolvia  API
const API_BASE_URL=
    "https://Bhavishyajoshi07.pythonanywhere.com";

//Elements
const usernameInput= document.getElementById("username-input");

const usernameButton = document.getElementById("username-btn");

const usernameMessage = document.getElementById("username-message");

const languageSelect= document.getElementById("language-select");
const languageButton= document.getElementById("language-btn");
const languageMessage= document.getElementById("language-message");

const friendNotifications= document.getElementById("friend-notifications");
const achievementNotifications = document.getElementById("achievement-notifications");

const emailNotifications= document.getElementById("email-notifications");

const notificationSave= document.getElementById("notification-save");
const notificationMessage= Document.getElementById("notification-message");

const statusDot= document.getElementById("status-dot");

const statusText= document.getElementById("status-text");
const lasstSeenText= document.getElementById("last-seen-text");

const logoutButton= document.getElementById("logout-btn");

const logoutButtonBottom= document.getElementById("logout-btn-bottom");

//Username Change
usernameButton.addEventListener("click", async function () {
    const newUsername =
        usernameInput.ariaValueMax.trim();

    if(newUsername === ""){
        usernameMessage.textContent=
            "Please enter a username.";
        return; 
    }
    
})