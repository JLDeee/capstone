# capstone

# Group 6 - Maria, Jackie, Jay

## NOTE:
* wireframe PDFs might be cut off in the GitHub preview, so please download them to see the full size


Project Name (Candidates): 
* P2 (pronounced "Player 2")
* Party Up
* Link
* Splitscreen
* GG - Gamer's Guild

Team Name (Candidates): 
* Gamers to Lovers
* Level Up Gang

## Brief Summary
Game partner finding / dating app. Based on Bumble’s model, you can match with the purpose of playing a game, or match with the purpose of finding love! Users will be able to display their favorite game genres, favorite games, and sort through users with similar tastes. Some visual ideas include displaying user details as a Pokemon card, or having an retro arcade aesthetic.

## Why we chose this topic
We all had an interest in gaming and we thought the idea of a gaming partner / gaming oriented dating app would be a fun idea. The app would specifically cater towards gamers and allow for gamers from any platform to be able to connect and interact, whether it be just for finding a gaming friend or a romantic partner. 

## New Technology
* GreenSock for animations
* BotPress to simulate talking to someone you've matched with

# Project Plan (WIP)

## Set Up
* [x] Create detailed schema diagram with tables and their relationships
    * Tables:
        * game
        * matches
        * app_user (Security)
        * app_role (Security)
    * Relationships:
        * app_user-game = Many-Many
        * app_user-match = One-Many
* [x] Create file tree diagram with classes and methods that we might need
* [x] Create Maven Project and set up pom.xml
* [x] Create basic packages following 3-layer architecture
* Determine components needed for React app on client side

## Database
### MySQL
* [x] Create database and tables for Production and Test

    * app_user (2-3 hours)
        * pk app_user_id (int)
        * email (varchar)
        * password_hash (varchar)
        * enabled (boolean)

            * first_name (varchar)
            * last_name (varchar)
                * (might remove these two since the app is moving away from the dating aspect) 
        * gamer_tag (varchar)
        * bio (varchar)
        * birthday (date)
        * fk preference_id (int)
            * (might simplify preference into just the user's gender)

    * preference (1 hour)
        * pk preference_id (int)
        * preference_name (varchar)

    * app_role (1 hour)
        * pk app_role_id (int)
        * role_name (varchar)

    * app_user_role (1 hour)
        * fk app_user_id (int)
        * fk app_role_id (int)

    * games (1 hour)
        * pk games_id (int)
        * game_title (varchar)
    
    * app_user_games (1 hour)
        * fk_app_user_id (int)
        * fk_games_id (int)

    * matches (1-2 hours)
        * pk matches_id (int)
        * fk app_user_id alias user1 (int)
        * fk app_user_id alias user2 (int)
            * (note: not sure if it will work... needs some trial and error)
        * matchTime (datetime)

    * posting (1-2 hours)
        * pk posting_id (int)
        * fk app_user_id (int)
        * fk games_id (int)
        * header (varchar) 
            * null-able
        * description (varchar)
    
* (optional?) Create queries to test tables (1-2 hours)

### IntelliJ
* [x] Create Models and Enums
    * AppUser (2-3 hours)
        * int AppUserId 
        * String email
        * String password
        * boolean enabled
            * String firstName
            * String lastName
                * (might remove these two since the app is moving away from the dating aspect) 
        * String gamerTag
        * LocalDate birthday
        * Preference gender
        * Preference preference
    * Gender (enum) (1 hour)
        * MALE
        * FEMALE
        * NONBINARY
        * OTHER
        * PREFER_NOT_TO_SAY
    * Game (1 hour)
        * int gameId
        * String gameTitle
    * Match (1-2 hours)
        * int matchId
        * int appUserId1
        * int appUserId2
        * LocalDateTime matchTime
    * Posting (1-2 hours)
        * int postingId
        * String header
        * String description

* [x] REFERENCE PACKAGE
    * add application properties file (double check name?) for environmental variables

* [x] DATA LAYER:
    * Create repositories (jdbc template repository) and interfaces
    * Add custom DataAccessException class
        * (check to see if necessary?)
    * Create mappers for AppUser, Game, Posting, Match
    * Create CRUD methods in repositories 
        * AppUserJdbcTemplateRepository (2-3 hours)
            * findAll
            * findByUsername
            * findByGameTitle
                * (maybe? in case you want to search for people with the same favorite games as you) 
            * add
            * delete
            * update
        * Game (we're pulling game titles from an API) (2-3 hours)
            * findAll
            * findByGameTitle
            * add
            * delete
        * Posting (2-3 hours)
            * findAll
            * findByGameTitle
            * add
            * update
            * delete
        * Match (2-3 hours)
            * findAll
            * findById
            * add
            * delete
    * Create data tests for each repository and test CRUD methods along the way

* [x] DOMAIN LAYER
    * Add Validation API (2-3 hours)
    * Create Result class with generic type and a ResultType enum (1-2 hours)
    * Create Service classes for AppUser, Game, Posting, Match (2-3 hours)
    * Create service tests and test methods as you go (2-3 hours)
        * utilize the Validation API (2-3 hours)

* [x] CONTROLLERS PACKAGE
    * create Controllers (2-3 hours)
    * ErrorResponse enum
    * GlobalExceptionHandler

* [x] SECURITY PACKAGE (3-4 hours)
    * AuthController in controllers package
    * AppUser 
        * (should already exist in models package)
    * AppUserService 
        * (should already exist in domain package)
    * JwtConverter
    * JwtRequestFilter
    * SecurityConfig
    * AppConfig outside of securities package

### React 
* [x] Use npm to create react app/install node modules (30 min)
* [x] Install react-router-dom@6 in preparation for client based routing 
* [x] Remove extra stuff in react app except for:
    * index.html
    * index.js
    * index.css
    * App.js
* [x] Create basic UI components: (1-2 hours)
    * Home
    * About
    * Contact
    * NavBar
    * Not Found
    * Error
    * Confirmation / Success
* Create specific components for our app: (2-3 hours)
    * Match
        * 
    * [x] UserProfile
        * (loads any user's information, including user currently logged in. perhaps the UI could be more shiny to distinguish "you" and other users)
    * [-]EditProfile
        * (only available for your own profile)
        * (a form that lets you edit and delete YOUR user info)
    * [x]UserList 
        * (list of users, can sort by games maybe)
    * [X]Postings
        * (list of postings)
        * (if logged in, can make a posting, edit your own postings, and delete your own postings)
    * [-]MakePosting
        * (form to add a posting if logged in)
    * [X]Login
        * (form for authentiacting user)
    * [X]Register
        * (form to create a new user)
    * [x]AuthContext 
        * (for useContext later...)
* Update App.js with client-based routing (30 min)
* Update index.css with basic page styling
    * link to necessary CSS framework (Bootstrap?) if needed 

## Research Needed
* figure out how to have a search bar that autofills with games from a game API so that game names are consistent when added to list of favorite games
* figure out if BotPress works for our purposes
* look into GreenSocks documentation
* look into how to handle matches table and if having two foreign keys from the same table, but with an alias, will work

## Stretch Goals
* favorite game genres in app_user
    * so we might have an option to sort by mutual favorite game genres
* game console field in app_user
    * so we might have an option to sort by mutual game consoles

# Class Tree
```
gamer
├───client
│   └───gamer-client (our react app)
│   │   ├───public
│   │   │   └───index.html
│   │   ├───src
│   │   │   ├───App.js
│   │   │   ├───index.css
│   │   │   ├───index.js
│   │   │   ├───UserProfile.js
│   │   │   ├───EditProfile.js
│   │   │   ├───UserList.js
│   │   │   ├───Postings.js
│   │   │   ├───MakePosting.js
│   │   │   ├───components
│   │   │   │   ├───Home.js
│   │   │   │   ├───About.js
│   │   │   │   ├───Contact.js
│   │   │   │   ├───NavBar.js
│   │   │   │   ├───NotFound.js
│   │   │   │   ├───Error.js
│   │   │   │   ├───Success.js
│   │   │   │   ├───Login.js
│   │   │   │   └───Register.js
│   │   │   └───context
│   │   │       └───AuthContext.js
│   │   └───node_modules
├───server
│   ├───database
│   │   ├───production.sql
│   │   ├───test.sql
│   │   └───queries.sql
│   └───src
│       ├───main
│       │   ├───java
│       │   │   └───learn
│       │   │       └───gamer
│       │   │           ├───controllers
│       │   │           ├───data
│       │   │           │   ├───mappers
│       │   │           │   │   ├───AppUserMapper.java
│       │   │           │   │   ├───PostingMapper.java
│       │   │           │   │   ├───GameMapper.java
│       │   │           │   │   └───MatchMapper.java
│       │   │           │   ├───DataAccessException.java
│       │   │           │   ├───AppUserJdbcTemplateRepository.java
│       │   │           │   ├───AppUserJdbcRepository.java (interface)
│       │   │           │   ├───PostingJdbcTemplateRepository.java
│       │   │           │   ├───PostingRepository.java (interface)
│       │   │           │   ├───GameRJdbcTemplateepository.java
│       │   │           │   ├───GameRepository.java (interface)
│       │   │           │   ├───MatchJdbcTemplateRepository.java
│       │   │           │   └───MatchRepository.java (interface)
│       │   │           ├───domain
│       │   │           │   ├───Result.java
│       │   │           │   ├───ResultType.java (enum)
│       │   │           │   ├───PostingService.java
│       │   │           │   ├───GameService.java
│       │   │           │   └───MatchService.java
│       │   │           ├───models
│       │   │           │   ├───AppUser.java
│       │   │           │   ├───Game.java
│       │   │           │   ├───Gender.java (enum)
│       │   │           │   ├───Match.java
│       │   │           │   └───Posting.java
│       │   │           ├───security
│       │   │           │   ├───AppUserService.java
│       │   │           │   ├───JwtConverter.java
│       │   │           │   ├───JwtRequestFilter.java
│       │   │           │   └───SecurityConfig.java
│       │   │           ├───App.jav
│       │   │           └───AppConfig.java
│       │   └───resources
│       │       └───application.properties
│       └───test
│           ├───java
│           │   └─── (insert tests here...)
│           └───resources
│               └───application.properties

```