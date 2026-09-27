const API_URL="https://Bhavishyajoshi07.pythonanywhere.com";

function getHeaders(){
    const token=localStorage.getItem("token");

    return {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    };
}

async function sendFriendRequest(username){
    try{
        const response =await fetch(`$(API_URL)/api/friends/requests`,{
            method:"POST",
            headers:getHeaders(),
            body:JSON.stringify({
                username:username
            })
        });

        const data=await response.json();

        if(!response.ok){
            console.log(data.error || "Friend request failed");
            return null;
        }
        return data;
    }catch(error){
        console.log("Friend request error:",error);
        return null;
    }
}

async function getFriendRequests(){
    try{
        const response=await fetch(`${API_URL}/api/friends/request`,{
            method:"GET",
            headers:getHeaders()
        });
        const data =await response.json();

        if(!response.ok){
            console.log(data.error || "Failed to get requests");
            return[];
        }
        return data;
    }catch(error){
        console.log("Requests connection error:",error);
        return[];
    }
}

async function acceptFriendRequest(requestId){
    try{
        const response=await fetch(
            `${API_URL}/api/friends/request/${requestId}/accept`,
            {
                method:"POST",
                headers:getHeaders()
            }
        );

        const data=await response.json();
        if(!response.ok){
            console.log(data.error || "Accept failed");
            return null;
        }
        return data;
    }catch(error){
        console.log("Accept error:",error);
        return null;
    }
}

async function rejectFriendRequest(requestId){
    try{
        const response=await fetch(
            `${API_URL}/api/friends/request/${requestId}/reject`,
            {
                method:"POST",
                headers:getHeaders()
            }
        );

        const data =await response.json();
        if(!response.ok){
            console.log(data.error || "Reject failed");
            return null;
        }
        return data;
    }catch (error){
        console.log("Reject error:",error);
        return null;
    }
}
async function getFriends(){
    try{
        const response=await fetch(`${API_URL}/api/friends`,{
            method:"GET",
            headers:getHeaders()
        });
        const data=await response.json();
        if(!response.ok){
            console.log(data.error || "Failed to get friends");
            return[];
        }
        return data;
    }catch(error){
        console.log("Friends connection error:",error);
        return [];
    }
}