const {updateBadges}=require("./badgeService");
function processGamification(profileData){
    if(!profileData){
        return null;
    }
    const stats=profileData.stats || {};
    const result={
        xp:stats.xp ||0,
        score:stats.score ||0,
        level:stats.level ||1,
        dailyXP:stats.daily_xp || 0,
        streak:stats.streak || 0,
        codeRuns:stats.code_runs ||0,
        errorsSolved:stats.error_solved ||0,
        codingSeconds:stats.coding_seconds || 0,
        badges:updateBadges(profileData)
    };
    return result;
}

module.exports={
    processGamification
};