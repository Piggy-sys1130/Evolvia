const mongoose=require("mongoose");
const xpTransactionschema=new mongoose.schema(

    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            index:true,
        },
        xpAmount:{
            type: Number,
            required:true,
        },
        activityType:{
            type:String,
            required:true,
        },
        reason:{
            type:String,
            required:true,
        },
        referenceId:{
            type:String,
            default:null,
        },
    },

    {
        timestamps:true,
    }
);

module.exports=mongoose.model(
    "XPTransaction",
    xpTransactionSchema
);    



