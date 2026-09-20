# Evolvia XP System
## 1.Purpose
XP represents a user's overall progress in Evolvia.
The XP system is designed to:
- Encourage regular coding 
- Reward meaningful learning activities 
- Encourage challenge completion 
- Reward project progress
- Encourage coding consistency 
- Prevent XP farming and abuse
---
## 2.XP Reward Table
|Activity|XP|
|---|---:|
|Code Run|2 XP|
|Successful Code Run|5 XP|
|Easy Challenge Completed|25 XP|
|Medium Challenge Completed|50 XP|
|Hard Challenge Completed|100 XP|
|Error Fixed|10 XP|
|Daily Coding Bonus|20 XP|
|Project Milestone Completed|75 XP|
|Project Completed|200 XP|
---
## 3.Code Run Rules
A code execution can receive one execution XP reward.
### Unsuccessful Code Run
Reward:
2 XP
### Successful Code Run
Reward:
5 XP
A successful code run receives 5 XP only.
It does NOT receive:
2 XP + 5 XP=7 XP.
This prevents double rewards.
---
## 4.Code Run Daily Limit 
To prevent users from farming XP by repeatedly running code:
- Only the first 20 eligible code executions per day can receive execution XP
- A normal execution gives 2 XP.
- A successful execution gives 5 XP.
- The daily execution XP limit is 100 XP.

The system must count the actual XP awarded.
Example:
If a user already earned 100 XP from code executions that day, additional code execution receive 0 execution XP.
The code execution itself can still work normally.
--- 
##5.Challenge XP
### Easy Challenge 
25 XP
### Medium Challenge 
50 XP
### hard Challenge 
100 XP
A challenge completion reward can only be received once per user for each challenge.
Repeating an already completed challenge does not provide the completion XP again.
---
## 6. Error Fix XP
Successfully fixing a valid coding error gives:
10 XP
The same error or event must not be repeatedly exploited to gain unlimited XP.
---
## 7. Daily Coding Bonus
A user who performs at least one valid coding activity during a calender day can receive:
20 XP
This bonus can only be awarded once per calender day.
The daily coding bonus is seperate from code execution XP.
---
## 8. Project Milestone XP
Completing  a valid project milestone gives:
75 Xp
Each milestone can provide XP only once for a user.
---
## 9. Project Completion XP
Completing a project gives:
200 XP
A project can provide the completion reward only once for a user.
---
## 10.XP Transaction Records
Every XP reward must create a transaction record.
The transaction should contain:
- Transaction ID
- User ID
- XP amount
- Activity type
- Reason 
- Created date and time
 
Example:
User ID:101
Activity:
MEDIUM_CHALLENGE_COMPLETED
XP:
50
Reason:
Medium coding challenge completed
---
## 11. One-Time XP Rewards
The following rewards must only be awarded once:
- Challenge completion XP
- Project milestone XP
- Project completion XP

The system must check whether the reward has already been given.
---
## 12.Daily XP Rewards;
The following rewards have daily limits:
- Code execution XP
- Daily coding bonus
---
## 13.Valid Activity
An activity must be validated before XP is awarded.
A valid activity should:
- Belong to an authenticated user
- Have a valid activity type
- Come from a real Evolvia action 
- Meet the reward conditions
- Not violate one-time reward rules
- Not exceed daily limits
---
## 14.Activity Types
The following activity types are used by the gamification system:
- CODE_RUN
- CODE_SUCCESS
- EASY_CHALLENGE_COMPLETED
- MEDIUM_CHALLENGE_COMPLETED
- HARD_CHALLENGE_COMPLETED
- ERROR_FIXED
- DAILY_CODING_BONUS
- PROJECT_COMPLETED
---
## 15.Important Principle
XP represents user progress.
XP is different from Score.
XP is mainly used for:
- Levels
- Progress
- Level-up events
Score is mainly used for:
- Performance
- Rankings
- Leaderboards
---
## Version 
XP System Version 1.0
Status:Initial Design








# Evolvia Score System
## 1. Purpose
Score represents a user's coding performance and achievements.
Score may be used for:
- Leaderboards
- Rankings
- Performance tracking
- Achievements displays
---
## 2. Score Reward Table
|Activity|Score|
|---|---:|
|Code Run|2|
|Successful Code Run|10|
|Easy Challenge Completed|50|
|Medium Challenge Completed|100|
|Hard Challenge Completed|200|
|Error Fixed|20|
|Project Milestone Completed|25|
|Project completed|300|
---
## 3. Code Execution Score
An execution receives only one execution score.
### Unsuccessful Code Run
2 Score
### successful Code Run
10 Score
An successful code run does not receive both rewards.
---

## 4.Code Execution Daily Limit
Code execution score follows the same daily execution limit as the XP system
Only the first 20 eligible code executions per day can receive execution score.
Additional executions can still happen but receive no execution score after the daily limit is reached.
---

## 5. Challenge Score
### Easy Challenge
50 score
### Medium Challenge
100 score
### Hard Challenge
200 score
Challenge completion score can only be awarded once for each challenge per user.
---

## 6.Error Fix Score
A valid error fix gives:
20 Score
---

## 7.Daily Coding Bonus
A valid daily coding activity gives:
25 Score
The daily coding bonus can only be awarded once per calendar day.
---

## 8. Project Milestone Score
A completed project milestone gives:
100 Score
Each milestone can only provide its reward oncd.
---

## 9.Project Completion Score
Completing a project gives:
300 Score
A project can only provide the completion reward once.
---

## 10.Score Transactions
Every score reward should be recorded.
Each transaction should contain:
- Transaction ID
- User ID
- Score amount
- Activity type
- Reason
- Created date and time
---

## 11.Score Rules
- Score cannot br negative
- Invalid activities do not receive score
- One-time rewards cannot be duplicated 
- Daily rewards cannot be duplicated
- Score and XP are calculated separately.
- Score does not determine the user's level.
---

## 12.Important Principles
Score represents performance and achievements.
XP represents overall progression.
The two systems must remain separate.
---
## Version
Score System Version:1.0
Status: Initial Design
