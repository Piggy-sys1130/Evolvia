const UserGamification=require("./models/userGamification");
const{processActivity}=require("./services/gamificationService");
const ACTIVITY_TYPES=require("./constants/activityTypes");

const user =new UserGamification({
    userId:101
});

user.totalXP=100;
user.dailyXP=100;
const yesterday=new Date();
yesterday.setDate(yesterday.getDate()-1);
user.dailyXPDate=yesterday;

console.log("Before activity:");
console.log({
    totalXP:user.totalXP,
    dailyXP:user.dailyXP,
    dailyXPDate:user.dailyXPDate
    
});



const result =processActivity(
    user,
    ACTIVITY_TYPES.CODE_RUN
)

console.log("\nAfter Code Run:");
console.log(result);