function getXP(profileData){
    if(!profileData || !profileData.stats){
        return {
            xp:0,
            dailyXP:0
        };
    }
    return {
        xp:profileData.stats.xp||0,
        dailyXP:profileData.stats.daily_xp ||0
    };
}
module.exports={
    getXp
};