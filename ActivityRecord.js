const mongoose=require("mongoose");
const activityRecordSchema=new mongoose.Schema(
    
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            index:true,
        },
        activityType:{
            type:String,
            required:true,
        },
        referenceId:{
            type:String,
            default:null,
        },
        activityDate:{
            type:Date,
            required:true,
            default:Date.now,
        },
        metadata:{
            type:mongoose.Schema.Types.Mixed,
            default:{},
        },
    },
    {
        timestamps:true,
    }
);

module .exports=mongoose.model(
    "ActivityRecord",
    activityRecordSchema
);