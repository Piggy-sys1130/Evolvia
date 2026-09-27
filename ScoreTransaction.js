function createScoreTransaction(
   scoreAmount,
   activitytype,
   reason,
   referenceId=null
){
   return {
      scoreAmount:scoreAmount,
      activityType:activityType,
      reason:reason,
      referenceId:referenceId,
      date:new Date().toISOString()
   };
}

module.exports={
   createScoreTransaction
};