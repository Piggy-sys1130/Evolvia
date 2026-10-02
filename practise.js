const API_BASE_URL = "https://Bhavishyajoshi07.pythonanywhere.com";
let selectedLanguage = "python";
const languageMap={
    python: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    html: "html"
};

document.addEventListener("DOMContentLoaded",()  => {
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href= "loginpage.html";
        return;
    }
    const languageButtons = document.querySelectorAll(".language-button");
    const runButton = document.getElementById("runButton");
    const copyButton = document.getElementById("copyOutput");
    
    languageButtons.forEach(button  =>{
        button.addEventListener("click", ()  =>{
            languageButtons.forEach(btn  => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            selectedLanguage = button.dataset.language;
        });
    });
    if(runButton){

        runButton.addEventListener("click", runCode);
    }
    if(copyButton){
        copyButton.addEventListener("click",copyOutput);
    }
});
async function runCode(){
    const codeEditor = document.getElementById("codeEditor");
    const output = document.getElementById("output");
    const runButton = document.getElementById("runButton");

    const code = codeEditor.value;

    if(!code.trim()){
        output.textContent = "Please write some code first,";
        return;
    }
    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "loginpage.html"
        return;
    }

    runButton.disabled= true;
    runButton.textContent = "Running...";
    output.textContent= "Running Code...";
}