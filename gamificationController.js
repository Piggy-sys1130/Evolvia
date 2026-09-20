const UserGamification = require("../models/userGamification");
const{processActivity}=require("../services/gamificationService");

const users = new Map();
function getUserGamification(userId){
    if(!users.has(userId)){
        users.set(
            userId,
            new UserGamification(userId)
        );
    }

    return users.get(userId);
}

function processUserActivity(userId,activityType){
    const userGamification =
        getUserGamification(userId);
    const result=processActivity(
        userGamification,
        activityType
    );
    return result;    
}

module.exports={
    getUserGamification,
    processUserActivity
};