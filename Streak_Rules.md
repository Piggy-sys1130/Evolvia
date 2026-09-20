#Evolvia Coding Streak System 
## 1. Purpose
The coding streak system encourages users to practice coding consistently.
A streak represents the number of consecutive calender days on which a user performs at least one valid coding activity.
---
## 2.What counts as a Coding Day?
A coding day is a calender on which the user performs at least one valid coding activity.
Valid activities include:
- Code execution 
- Successful code execution 
- Coding challenge completion
- Error fixing
- Project milestone completion
- Project completion
---
## 3.Multiple Activities on one day
Multiple activities on the same calender day count as only one streak day.
Example:
Monday:
- 5 code runs
- 2 challenges
- 1 error fix
Result:
Streak increases by only 1 day.
---
## 4.Consecutive Days
If the user performs a valid coding activity on consecutive calender days , the streak increases.
Example:
Monday=1 day
Tuesday=2 days
Wednesday=3 days
---
## 5. Missed Day
If the user does not perform a valid coding activity for a calender day, the current streak is broken.
When the user returns , new streak begins at 1.
---
## 6.Same-Day Activity
Additional activities on the same calender day do not increase the streak again.
---
## 7.Longest Streak
The system should maintain:
- Current Streak
- Longest streak
- Last coding date
The longest streak should never decrese.
---
## 8.Valid Activity
Only valid Evolvia activities can count toward a streak.
Invalid or rejected activities do not count.
---
## 9. Calender Day
Streak calculations are based on calender days.
They are not based on the number of hours between activities.
---
## 10.Version
Streak System Version:1.0
Status:Initial Design
