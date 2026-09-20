#Evolvia Level System
## 1. Purpose
The level system represents a user's overall progression in evolvia.
Levels are calculated using XP.
---
## 2.XP and Levels
A user's level is determined by their total XP.
Score does not affect the user's level.
---
## 3.Level Requirements
|Level|Required XP|
|---|---:|
|1|0 XP|
|2|100 XP|
|3|250 XP|
|4|500 XP|
|5|1,000 XP|
|6|2,000 XP|
|7|3,500 XP|
|8|5,000 XP|
|9|7,500 XP|
|10|10,000 XP|
---
## 4.Level Calculation
The user's level is the highest level whose XP requirement has been reached.
Example:
If a user has 600 XP:
Level=4
Because:
Level 4=500 XP
Level 5=1,000 XP
---
## 5. Level Up
When a user's XP reaches the requirement for the next level,the user levels up.
A level-up event may be displayed to the user.
---
## 6.XP Reduction
XP must not become negative.
If XP is reduced in the future, the system must recalculate the user's level from the current total XP.
---
## 7.Score Independence 
Score must not affect:
- XP
- Level
- Level-up calculation
XP and Score are seperate systems.
---
## 8.Maximum Level
The initial system supports level 10.
Future versions may add additional levels.
---
## 9.Version
Level System Version:1.0
Status:Initial Design
