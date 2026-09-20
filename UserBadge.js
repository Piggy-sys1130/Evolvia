const mongoose = require("mongoose");
const userBadgeSchema = new mongoose.Schema(
    
    {
        userId:{
            type:mongoose.schema.Types.ObjectId,
            required:true,
            index:true,
        },
        badgeId:{
            type:String,
            required:true,
        },
        badgeName:{
            type: String,
            required:true,
        },
        awardedAt:{
            type:Date,
            default:Date.now,
        },
    },
    {
        timestamps:true,
    }
);

//A user can receive each badge only once
userBadgeSchema.index(
    {userId:1,badgeId:1},
    {unique:true}
);
module.exports=mongoose.model("UserBadge",userBadgeSchema);