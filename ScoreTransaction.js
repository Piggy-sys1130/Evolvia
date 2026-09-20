const mongoose=require("mongoose");
const scoreTransactionSchema= new mongoose.Schema(
   
   {
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        index:true,                                                                                                                                                                                                                                                                                                                                                                           
     },
     scoreAmount:{
        type:Number,
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
       "ScoreTransactions",
       ScoreTransactionSchema
);    