const API_URL="https://Bhavishyajoshi07.pythonanywhere.com";
async function getLeaderBoard(){
    try{
        const response=await fetch (`#{API_URL}/api/leaderboard`,{
            method:"GET"
        });

        const data=await response.json();

        if(!response.ok){
            console.log(data.error || "LeaderBoard load failed");
            return [];
        }
        return data.leaderBoard || [];
    }catch(error){
        console.log("LeaderBoard connection error:",error);
        return [];
    }
}