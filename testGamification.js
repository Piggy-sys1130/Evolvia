const UserGamification=require("./models/userGamification");
const{processActivity}=require("./services/gamificationService");
const ACTIVITY_TYPES=require("./constants/activityTypes");

const user =new UserGamification({
    userId:101
});





const result =processActivity(
    user,
    ACTIVITY_TYPES.TIME_CHALLENGE
);

console.log("\nAfter TIME CHALLENGE:");
console.log(result);