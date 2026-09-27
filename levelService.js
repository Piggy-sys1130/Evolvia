const LEVEL_THRESHOLDS=require("../constants/levelThresholds");

function calculateLevel(totalXP){
    let currentLevel=1;
    for(const levelData of LEVEL_THRESHOLDS){
        if(totalXP>=levelData.requiredXP){
            currentLevel=levelData.level;
        }else{
            break;
        }
    }
    return currentLevel;
}

module.exports={
    calculateLevel
};

