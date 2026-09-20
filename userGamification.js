const mongoose=require("mongoose");
const userGamificationSchema= new mongoose.Schema(
    
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            unique:true,
            index:true,
        },
        totalXP:{
            type:Number,
            default:0,
            min:0,
        },
        totalScore:{
            type:Number,
            default:0,
            min:0,
        },
        level:{
            type:Number,
            default:1,
            min:1,
        },
        currentStreak:{
            type:Number,
            default:0,
            min:0,
        },
        lastCodingDate:{
            type:Date,
            default:null,
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model(
    "UserGamification",
    userGamificationschema
);