MVP (Minimum Viable Product) Features:

Core Features for Initial Launch:

1. Super Admin Features

- Complete system oversight and management
- Manage all groups and users across the platform
- Access to system-wide configurations
- Monitor application performance metrics
- View all predictions and standings

2. Group Admin Features

- Create and manage their group settings
- Handle player roster management
- Set group entry fees and rules
- View group members' predictions after deadline
- Access group-specific leaderboards
- Submit their own match predictions

3. Player Features

- Basic login/signup functionality
- Join existing groups
- View current gameweek EPL matches
- Select and predict 3 matches per gameweek
- View personal predictions
- See leaderboard standings after deadline
- View group predictions after submission cutoff

4. Core System Features

- Role-based access control (Player, Group Admin, Super Admin)
- Basic deadline enforcement for predictions
- Automated points calculation system
- Group management infrastructure
- Basic leaderboard functionality

Future Phases Will Include:

- Joker system implementation
- Boxing Day/Final Day special rules
- Advanced payment integration
- Enhanced statistics and historical data
- Advanced user profiles

---

I want to build a football scores predictor application with three distinct user roles:

Super Admin (Application Owner):

- Has complete control and oversight of the entire application
- Can view and manage all groups
- Access to system-wide settings and configurations
- Ability to monitor and maintain application performance
- Can perform all actions available to Group Admins and Players

Group Admin (Captain/Player Manager):

- Coordinates and manages their specific group
- Handles player onboarding and payment collection
- Can set group-specific rules and entry fees
- Participates in predictions like regular players
- Manages deadlines and ensures smooth group operation

Players:

- Join groups and create personal profiles
- View upcoming English Premier League matches
- Select 3 matches per gameweek for score predictions
- Submit predictions before the gameweek deadline
- View their predictions and standings after submission deadlines

The application centers around Premier League match predictions, where players in each group submit their score predictions for their chosen matches before the first kick-off of each gameweek.

There should be a table that shows the users predictions for the week that only will only be visible to the user and all other user and the admin after the deadline for submitting predictions has passed. There will also be a table that shows the users points for the season and their current position in the league.

Scoring Points:

The point scoring will work as follows:
Predicting the correct result:
Home win – 3 points
Away win – 4 points
Draw – 6 points
Predicting the correct score:
If you are successful in predicting a correct score, you will get an additional 3 points per correct score.
Predicting 3 perfect scores:
If you successfully predict the correct scores of 3 games then you will receive an additional 10 points.

Joker:
You will be able to play 2 Jokers.
Your first Joker must be played between the start of the season and the round before the Boxing Day games (if you don't use it, It will be used for you on the round before the Boxing Day predictions).
Your second Joker must be played after Boxing Day and before the final round of games (if you don't use it, It will be used for you on the round before the final round of games).
The Joker will double your points for that round.

Boxing Day and Final Day Madness:
On Boxing Day and the last day of the season where all 10 Premier League games are played at the same time, you will need to predict the scores of all 10 games.

How To Enter/Payment:

There entry would be an entry fee for the season agreed upon by the group.
If you would like to enter, all you need to do is sign up to the app and create a profile.
You will also need to transfer the agreed upon the entry fee
this all be managed by the designated admin of the group

Note the entry fee is only paid once per season and they are optional - groups can decide to not have a prize for the winners. Just playing for pride and bragging rights.

Prizes:

Once everyone who wants to join in has done so, the system will then determine the prize structure for winners, in this case 1st, 2nd and 3rd place will receive a prize at the end of the season.
