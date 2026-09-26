const BADGES=[
    //============
    //XP BADGES
    //============
    {
        id:"beginner",
        name:"Beginner",
        description:"Earn 5,000 XP",
        requiredXP:5000
    },
    {
        id:"coder",
        name:"Coder",
        description:"Earn 10,000 XP",
        requiredXP:10000
    },
    {
        id:"rising-coder",
        name:"Rising Coder",
        description:"Earn 25,000 XP",
        requiredXP:25000
    },
    {
        id:"skilled-coder",
        name:"Skilled Coder",
        description:"Earn 50,000 XP",
        requiredXP:50000
    },
    {
        id:"advanced-coder",
        name:"Advanced Coder",
        description:"Earn 100,000 XP",
        requiredXP:100000
    },
    {
        id:"expert-coder",
        name:"Expert Coder",
        description:"Earn 250,000 XP",
        requiredXP:250000
    },
    {
        id:"elite-coder",
        name:"Elite Coder",
        description:"Earn 500,000 XP",
        requiredXP:500000
    },

    //================================
    //SPECIAL BADGES
    //================================
    {
        id:"error-solver",
        name:"Error Solver",
        description:"Solve 10 coding errors and maintain a continuous 5-month coding streak",
        requiredErrorsSolved:10,
        requiredStreakDays:150
    },
    {
        id:"faster-coder",
        name:"Faster Coder",
        description:"Complete 10 time challenges and maintain a continuous 5-month coding streak",
        requiredTimeChallenges:10,
        requiredStreakDays:150
    },
    {
        id:"coding-master",
        name:"Coding Master",
        description:"Complete 100 Coding challenges and maintain a continuous 6-month coding Streak",
        requiredChallenges:100,
        requiredStreakDays:180
    },
    {
        id:"master-coder",
        name:"Master Coder",
        description:"Earn 1,000,000 XP and maintain a continuous 6-month coding streak",
        requiredXP:1000000,
        requiredStreakDays:180
    }
];

module.exports=BADGES;