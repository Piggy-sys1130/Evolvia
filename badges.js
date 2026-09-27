const BADGES=[
    {
        id:"beginner",
        name:"Beginner",
        requiredXP:100
    },
    {
        id:"coder",
        name:"Coder",
        requiredXP:500
    },
    {
        id:"rising-coder",
        name:"Rising Coder",
        requiredXP:1000
    },
    {
        id:"skilled-coder",
        name:"Skilled Coder",
        requiredXP:2000
    },
    {
        id:"advanced-coder",
        name:"Advanced Coder",
        requiredXP:3500
    },
    {
        id:"expert-coder",
        name:"Expert Coder",
        requiredXP:5000
    },
    {
        id:"master-coder",
        name:"Master Coder",
        requiredXP:7500
    },
    {
        id:"coding-legend",
        name:"Coding Legend",
        requiredXP:10000
    }
];

async function getBadges(){
    const token =localStorage.getItem("token");

    if(!token){
        console.log("Login required");
        return[];
    }
    try{
        const response=await fetch(`${API_URL}/api/Profile`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });

        const data=await response.json();
        if(!response.ok){
            console.log(data.error || "Failed to get profile");
            return[];
        }

        console.log("Backend badges:",data.badges);
        return data.badges || [];

    }catch (error){
        console.log("Backend connection error:",error);
        return[];
    }
}

async function loadBadges(){
    const badges=await getBadges();
    console.log("User badges:",badges);

    return badges;
}

module.exports={
    BADGES,
    getBadges,
    loadBadges
};