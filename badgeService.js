function getUnlockedBadges(profileData){
    if(!profileData || !profileData.badges){
        return[];

    }
    return profileData.badges;
}

function updateBadges(profileData){
    return getUnlockedBadges(profileData);
}

module.exports={
    getUnlockedBadges,
    updateBadges
};