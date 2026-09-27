const API_URL="https://Bhavishyajoshi07.pythonanywhere.com";

async function runCode(language,code){
    const token=localStorage.getItem("token");
    if(!token){
        console.log("Login required");
        return null;
    }
    try{
        const response=await fetch (`${API_URL}/api/code/run`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                language:language,
                code:code
            })
        });

        const data =await response.json();

        if(!response.ok){
            console.log(data.error || "Code execution failed");
            return null;
        }
        return data;

    }catch(error){
        console.log("Code connection error:",error);
        return null;
    }
}