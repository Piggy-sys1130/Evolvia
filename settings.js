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
    try{
        /*BACKEND CONNECTION
        pUT/ api/profileusername

        Body:
        {
            "username": "newusername"
        }
        */
       const response = await fetch(
            `${API_BASE_URL}/api/profile/username`,
            {
                method: "PUT",

                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: newUsername
                })
            }
        );
        const data = await response.json();
        if(!response.ok){
            throw new Error(
                data.error || "username update failed"
            );
        }
        usernameMessage.textContent=
            "Username updated successfully.";

        usernameInput.value= "";
    } catch(error){
        console.error(error);

        usernameMessage.textContent=
            error.message;
    }
});

//FAVOURITE LANGUAGE

languageButton.addEventListener("click", async function(){
    const language= 
        languageSelect.value;

    try{
         /*BACKEND CONNECTION
        pUT/ api/profile/language

        Body:
        {
            "language": "python"
        }
        */

        const response = await fetch(
            `${API_BASE_URL}/api/profile/language`,
            {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language:language
                })
            }
        );

        const data = response.json();

        if(!response.ok){
            throw new Error(
                data.error || "Language update failed"
            );
        }

        languageMessage.textContent=
            "Favourite language saved.";
    } catch(error){
        console.error(error);
        languageMessage.textContent= error.message;
    }
});

//Notification  settings
notificationSave.addEventListener("click", async function(){
    const settings = {
        friends: friendNotifications.checked,

        achievements: achievementNotifications.checked,

        email: emailNotifications.checked
    };

    try{
        /*BACKEND CONNECTION
        pUT/ api/notifications

        Body:
        {
            "friends": true,
            "achievements": true,
            "email": false
        }
        */

        const response = await fetch(
            `${API_BASE_URL}/api//notifications`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(settings)


            }
        );
        const data = await response.json();

        if(!response.ok){
            throw new Error(
                data.error ||
                "Notification update failed"
            );
        }
        notificationMessage.textContent= 
            "Notification settings saved.";
    } catch (error){
        console.error(error);

        notificationMessage.textContent=
            error.message;
    }
});

//GEt NOtifications Settings
async function loadNotificationSettings(){
    try{
        /*BACKEND CONNECTION
        GET /api/notifications
        */

        const response = await fetch(
            `${API_BASE_URL}/api/notifications`
        );
        const data= await response.json();

        if(!response.ok){
            throw new Error(
                data.error ||
                "Could not load notifications"
            );
        }

        friendNotifications.checked=
            data.friends;

        achievementNotifications.checked=
            data.achievements;

        emailNotifications.checked=
            data.email;
    } catch(error){
        console.error(
            "notification loading error:",
            error
        );
    }
}

//Get Favourite Language
async function loadFavouriteLanguage() {
     try{
        /*BACKEND CONNECTION
        GET /api/profile/language
        */

        const response = await fetch(
            `${API_BASE_URL}/api/profile/language`
        );
        const data= await response.json();

        if(!response.ok){
            throw new Error(
                data.error ||
                "Could not load language"
            );
        }
        if(!data.language){
            languageSelect.value=
                data.language;
        }

    } catch(error){
        console.error(
            "Language loading error:",
            error
        );
    }
}

//Online Status
async function updateOnlinestatus() {
     try{
        /*BACKEND CONNECTION
        POST /api/status/heartbeat
        */

        const response = await fetch(
            `${API_BASE_URL}/api/status/heartbeat`,
            {
                method: "POST"
            }
        );

        if(!response.ok){
            throw new Error(
                "status Update  failed"
            );
        }
        statusDot.classList.add("online");
            statusText.textContent=
                "You are online";

            lasstSeenText.textContent=
                "Your activity is currently active.";
        
    } catch(error){
        console.error(
            "status error:",
            error
        );
        statusDot.classList.remove("online");
            statusText.textContent=
                "status Unavailable";

            lasstSeenText.textContent=
                "Could not connect to server.";
    }
}
//send heartbeat every 30 seconds
setInterval(
    updateOnlinestatus,
    30000
);

//LOGOUT
async function logoutUser(){
    try{
        /*
        BACKEND CONNECTION
        POST /api/logout
        */

        await fetch(
            `${API_BASE_URL}/api/logout`,
            {
                method: "POST"
            }
        );
    }catch (error){
        console.error(
            "Logout request failed:",
            error
        );
    } finally{
        //REMOVE LOGIN INFORMATION

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        //go to login page
        window.location.href=
            "loginpage.html";
    }
}

logoutButton.addEventListener("click",logoutUser);

logoutButtonBottom.addEventListener("click",logoutUser);

//page Load
document.addEventListener(
    "DOMContentLoaded",
    function(){

        loadNotificationSettings();
            loadFavouriteLanguage();
            updateOnlinestatus();
    }
);