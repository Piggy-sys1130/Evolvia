const BADGES=require("../constants/badges");

//================================
//CHECK SPECIAL BADGE CONDITIONS
//================================
function isSpecialBadgeUnlocked(badge,userGamification){
    //Error Solver
    if(badge.id==="error-solver"){
        return (
            userGamification.errorsSolved>=
                badge.requiredErrorsSolved &&

            userGamification.currentStreak>=
                badge.requiredStreakDays
        );
    }

    //Faster Coder
    if(badge.id==="faster-coder"){
        return(
            userGamification.timeChallengesCompleted>=
                badge.requiredTimeChallenges &&

            userGamification.currentStreak>=
                badge.requiredStreakDays    
        );
    }

    //Coding Master
    if(badge.id==="coding-master"){
        return(
            userGamification.challengesCompleted >=
                badge.requiredChallenges &&
            
            userGamification.currentStreak>=
                badge.requiredStreakDays    
        );
    }

    //Master Coder
    if(badge.id==="master-coder"){
        return(
            userGamification.totalXP >=
                badge.requiredXP &&

            userGamification.currentStreak >=
                badge.requiredStreakDays    
        );
    }

    return false;
}

    //===============================
    //GET UNLOCKED BADGES
    //===============================

    function getUnlockedBadges(userGamification){
        const unlockedBadges=[
            ...(userGamification.badges ||[])
        ];

        for(const badge of BADGES){
            const alreadyUnlocked=
                unlockedBadges.some(
                    (unlockedBadge)=>
                        unlockedBadge.id===badge.id
                );

            if(alreadyUnlocked){
                continue;
            }

            //============================
            //NORMAL XP BADGE
            //============================

            if (
                badge.requiredXP &&
                !badge.requiredStreakDays
            ){
                if(
                    userGamification.totalXP >=
                    badge.requiredXP
                ){
                    unlockedBadges.push({
                        id:badge.id,
                        name:badge.name,
                        description:badge.description
                    });
                }
                continue;
            }

            //==============================
            //SPECIAL BADGE
            //==============================

            if(
                badge.requiredStreakDays &&
                isSpecialBadgeUnlocked(
                    badge,
                    userGamification
                )
            ){
                unlockedBadges.push({
                    id:badge.id,
                    name:badge.name,
                    description:badge.description
                });
            }
        }
        return unlockedBadges;
    }

    //========================
    //UPDATE USER BADGES
    //========================

function updateBadges(userGamification){
    userGamification.badges=
        getUnlockedBadges(
            userGamification
        );
    return userGamification.badges;    
    
}

module.exports={
    getUnlockedBadges,
    updateBadges,
    isSpecialBadgeUnlocked
};