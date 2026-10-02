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

    try{
        const response = await fetch(
             `${API_BASE_URL}/api/code/run`,
             {
                method: "POST",

                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    language: languageMap[selectedLanguage],
                    code: code
                })
             }
        );
        const data = await response.json();
        if(response.status === 401){
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            Window.location.href= "loginpage.html";
            return;
        }
        if(!response.ok){
            output.textcontent =
                data.error ||
                data.message ||
                "Something went wrong.";

                return;
        }
        if(data.stdout){
            output.textContent= data.stdout;

        }
        else if(data.stderr){
            output.textContent = data.stderr;
        }
        else if(data.output){
            output.textContent = data.output;
        }
        else if(data.message){
            output.textContent = data.message;
        }
        else{
            output.textContent = "code executed successfully,";
        }
    }
    catch(error){
        console.error(error);
        output.textContent ="Unable to connect to the server.";

    }
    finally{
        runButton.disabled = false;
        runButton.textContent="Run Code";
    }
}

async function copyOutput(){
    const output = document.getElementById("output");

    if(!output)return;

    try{
        await navigator.clipboard.writeText(
            output.textContent
        );

        const copyButton = document.getElementById("copyOutput");
        if(copyOutput){
            const oldText = copyButton.textcontent;

            setTimeout(() =>{
                copyButton.textContent = oldText;
            },1500);
        }
    }
    catch (error){

        console.error(error);
    }
}