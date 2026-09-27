function createActivityRecord(activityType,data={}){
    return {
        activityType:activityType,
        data:data,
        date:new Date().toISOString()
    };
}

module.exports={
    createActivityRecord
};