const ACTIVITY_TYPES=require("../constants/activityTypes");
const VALID_ACTIVITY_TYPES=Object.values(ACTIVITY_TYPES);
const validateActivity=({
    userId,
    activityType,
    referenceId = null,
})=>{
    //Check user
    if(!userId){
        return{
            valid:false,
            message:"User ID is required.",
        };
    }

    //Check activity type
    if(!activityType){
        return{
            valid:false,
            message:"Activity type is required.",
        };
    }

    //Check wheather activity type is valid
    if (!VALID_ACTIVITY_TYPES.includes(activityType)){
        return{
            valid:false,
            message:'Invalid activity type:${activityType}',
        };
    }

    //One-time activities need a reference ID
    const oneTimeActivities=[
        ACTIVITY_TYPES.EASY_CHALLENGE_COMPLETED,
        ACTIVITY_TYPES.MEDIUM_CHALLENGE_COMPLETED,
        ACTIVITY_TYPES.HARD_CHALLENGE_COMPLETED,
        ACTIVITY_TYPES.PROJECT_MILESTONE_COMPLETED,
        ACTIVITY_TYPES.PROJECT_COMPLETED,
    ];
    
    if(
        oneTimeActivities.includes(activityType)&&
        !referenceId
    ){
        return {
            valid:false,
            message:"Reference ID is required for this activity.",
        };
    }
    return{
        valid:true,
        message:"Activity is valid.",
    };
};    

module.exports={
    validateActivity,
};