const API_URL="https://Bhavishyajoshi07.pythonanywhere.com";
async function getProfile(){
    const token =localStorage.getItem("token");
    if(!token){
        console.log("Login required");
        return null;
    }
    try{
        const response=await fetch(`${API_URL}/api/profile`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        const data=await response.json();
        if(!response.ok){
            console.log(data.error ||"Profile load failed");
            return null;
        }
        return data;
    }catch(error){
        console.log("Profile connection error:",error);
        return null;
    }
}

