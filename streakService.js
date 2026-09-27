function getStreak(profileData){
    if(!profileData ||!profileData.stats){
        return0;
    }
    return profileData.stats.streak || 0;
}
module.exports={
    getStreak
};