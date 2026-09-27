function getScore(profileData){
    if(!profileData || !profileData.stats){
        return 0;
    }
    return profileData.stats.score || 0;
}
module.exports={
    getScore
};