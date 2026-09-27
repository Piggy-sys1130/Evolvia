const UserGamification=require("../models/userGamification");
const{
    processActivity
}=require("../services/gamificationService");

const users= new Map();
function getUserGamification(userId){
    if(!users.has(userId)){
        const newUser=new UserGamification({
            userId:userId
        });

        users.set(userId,newUser);
    }
    return users.get(userId);
}

function processUserActivity(
    userId,
    activityType
){
    const userGamification=
        getUserGamification(userId);

    const result=
        processActivity(
            userGamification,
            activityType
        );
    return result;    
}

function getUserData(userId){
    const user=
        getUserGamification(userId);

    return{
        userId:user.userId,
        totalXP:user.totalXP,
        totalScore:user.totalScore,
        level:user.level,
        currentStreak:user.currentStreak,
        longestStreak:user.longestStreak,
        dailyXP:user.dailyXP,
        badges:user.badges
    };    
}

function resetUser(userId){
    if(users.has(userId)){
        users.delete(userId);
    }

    return{
        success:true,
        message:"Temporary user reset successfully"
    };
}

function getAllUsers(){
    return Array.from(users.values()).map((user)=>{
        return{
            userId:user.userId,
            totalXP:user.totalXP,
            totalScore:user.totalScore,
            level:user.level,
            currentStreak:user.currentStreak,
            longestStreak:user.longestStreak,
            dailyXP:user.dailyXP,
            badges:user.badges
        }
    })
}

module.exports={
    getUserGamification,
    processUserActivity,
    getUserData,
    resetUser,
    getAllUsers
};