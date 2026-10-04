// Evolvia API
const API_BASE_URL =
    "https://Bhavishyajoshi07.pythonanywhere.com";

// Elements
const usernameInput = document.getElementById("username-input");
const usernameButton = document.getElementById("username-btn");
const usernameMessage = document.getElementById("username-message");

const languageSelect = document.getElementById("language-select");
const languageButton = document.getElementById("language-btn");
const languageMessage = document.getElementById("language-message");

const friendNotifications =
    document.getElementById("friend-notifications");

const achievementNotifications =
    document.getElementById("achievement-notifications");

const emailNotifications =
    document.getElementById("email-notifications");

const notificationSave =
    document.getElementById("notification-save");

const notificationMessage =
    document.getElementById("notification-message");

const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const lastSeenText = document.getElementById("last-seen-text");

const logoutButton = document.getElementById("logout-btn");
const logoutButtonBottom =
    document.getElementById("logout-btn-bottom");


// JWT token
function getToken() {
    return localStorage.getItem("token");
}


// Common headers
function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };
}


// Username Change
usernameButton.addEventListener("click", async function () {

    const newUsername = usernameInput.value.trim();

    if (newUsername === "") {
        usernameMessage.textContent =
            "Please enter a username.";
        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/profile/username`,
            {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify({
                    username: newUsername
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Username update failed"
            );
        }

        usernameMessage.textContent =
            "Username updated successfully.";

        usernameInput.value = "";

    } catch (error) {

        console.error(error);

        usernameMessage.textContent =
            error.message;
    }
});


// Favourite Language
languageButton.addEventListener("click", async function () {

    const language = languageSelect.value;

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/favourite-language`,
            {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify({
                    language: language
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Language update failed"
            );
        }

        languageMessage.textContent =
            "Favourite language saved.";

    } catch (error) {

        console.error(error);

        languageMessage.textContent =
            error.message;
    }
});


// Notification Settings
notificationSave.addEventListener("click", async function () {

    const settings = {
        friend_request_notifications:
            friendNotifications.checked,

        badge_notifications:
            achievementNotifications.checked,

        notifications_enabled:
            emailNotifications.checked
    };

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/notification-settings`,
            {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(settings)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error ||
                "Notification update failed"
            );
        }

        notificationMessage.textContent =
            "Notification settings saved.";

    } catch (error) {

        console.error(error);

        notificationMessage.textContent =
            error.message;
    }
});


// Load Notification Settings
async function loadNotificationSettings() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/notification-settings`,
            {
                method: "GET",
                headers: authHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error ||
                "Could not load notification settings"
            );
        }

        friendNotifications.checked =
            data.friend_request_notifications;

        achievementNotifications.checked =
            data.badge_notifications;

        emailNotifications.checked =
            data.notifications_enabled;

    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );
    }
}


// Load Favourite Language
async function loadFavouriteLanguage() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/favourite-language`,
            {
                method: "GET",
                headers: authHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error ||
                "Could not load language"
            );
        }

        if (data.favourite_language) {
            languageSelect.value =
                data.favourite_language;
        }

    } catch (error) {

        console.error(
            "Language loading error:",
            error
        );
    }
}


// Online Status
async function updateOnlineStatus() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/status/online`,
            {
                method: "POST",
                headers: authHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Status update failed"
            );
        }

        statusDot.classList.add("online");

        statusText.textContent =
            "You are online";

        lastSeenText.textContent =
            "Your activity is currently active.";

    } catch (error) {

        console.error(
            "Status error:",
            error
        );

        statusDot.classList.remove("online");

        statusText.textContent =
            "Status Unavailable";

        lastSeenText.textContent =
            "Could not connect to server.";
    }
}


// Send online status every 30 seconds
setInterval(
    updateOnlineStatus,
    30000
);


// Logout
async function logoutUser() {

    try {

        await fetch(
            `${API_BASE_URL}/api/status/offline`,
            {
                method: "POST",
                headers: authHeaders()
            }
        );

    } catch (error) {

        console.error(
            "Logout status request failed:",
            error
        );

    } finally {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href =
            "loginpage.html";
    }
}


logoutButton.addEventListener(
    "click",
    logoutUser
);

logoutButtonBottom.addEventListener(
    "click",
    logoutUser
);


// Page Load
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadNotificationSettings();
        loadFavouriteLanguage();
        updateOnlineStatus();

    }
);