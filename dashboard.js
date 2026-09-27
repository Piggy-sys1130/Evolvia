//Evolvia dashboard javascript
//language buttons
const languageButtons =document.querySelectorAll(".language-btn");
languageButtons.forEach(function(button){
    button.addEventListener("click", function(){

        const language = button.getAttribute("data-language");

        if(language){
            window.location.href="practise.html?language=" + language;
        }
    });
});

//leaderboard tabs
const tabs = document.querySelectorAll(".leaderboard-tabs button");
tabs.forEach(function(tab){
    tab.addEventListener("cick", function(){

        //remove selected class from all tabs
        tabs.forEach(function(item){
            item.classList.remove("selected");
        });

        //add selected class to clicked tab
        tab.classList.add("selected");

        console.log("Leaderboard:", tab.innerText);
    });
});

//Welcome message
console.log("Welcome to Evolvia Dashboard");

//start Progress

const startButtons = document.querySelectorAll(".language-btn");
startButtons.forEach(function(button){
    button.addEventListener("click",function(){
        const card = button.closest(".language-card");

        if(card) {
            const languageName= card.querySelector("h3").innerText;

            console.log("starting:", languageName);
        }
    });
});

