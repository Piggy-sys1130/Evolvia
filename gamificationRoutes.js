const express = require("express");
const {
     processUserActivity
} = require("../controllers/gamificationController");

const router = express.Router();

router.post("/activity",(req,res)=>{
    try{
        const{userId,activityType}=req.body;

        if(!userId || !activityType){
            return res.status(400).json({
                succes:false,
                message:"userId and activityType are required"
            });
        }
        const result = processUserActivity(
            userId,
            activityType
        );
        res.status(200).json({
            success:true,
            data:result
        });
    } catch (error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});    

    



