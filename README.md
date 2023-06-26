# capstone

# Group 6 - Maria, Jackie, Jay

Project Name (Candidates): 
* P2 (pronounced "Player 2")
* Party Up
* Link
* Splitscreen

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
* Create detailed schema diagram with tables and their relationships
    * Tables:
        * game
        * matches
        * app_user (Security)
        * app_role (Security)
    * Relationships:
        * app_user-game = Many-Many
        * app_user-match = One-Many
* Create file tree diagram with classes and methods that we might need
* Create Maven Project and set up pom.xml
* Create basic packages following 3-layer architecture
* Determine components needed for React app on client side

## Database
### MySQL
* Create database and tables for Production and Test

    * app_user 
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

    * preference
        * pk preference_id (int)
        * preference_name (varchar)

    * app_role
        * pk app_role_id (int)
        * role_name (varchar)

    * app_user_role
        * fk app_user_id (int)
        * fk app_role_id (int)

    * games
        * pk games_id (int)
        * game_title (varchar)
    
    * app_user_games
        * fk_app_user_id (int)
        * fk_games_id (int)

    * matches
        * pk matches_id (int)
        * fk app_user_id alias user1 (int)
        * fk app_user_id alias user2 (int)
            * (note: not sure if it will work... needs some trial and error)
        * matchTime (datetime)

    * posting
        * pk posting_id (int)
        * fk app_user_id (int)
        * fk games_id (int)
        * header (varchar) 
            * null-able
        * description (varchar)
    
* (optional?) Create queries to test tables

### IntelliJ
* Create Models and Enums
    * AppUser 
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
    * Preference (enum)
        * MALE
        * FEMALE
        * NONBINARY
        * OTHER
        * PREFER_NOT_TO_SAY
    * Game 
        * int gameId
        * String gameTitle
    * Match
        * int matchId
        * int appUserId1
        * int appUserId2
        * LocalDateTime matchTime
    * Posting
        * int postingId
        * String header
        * String description

* REFERENCE PACKAGE
    * add application properties file (double check name?) for environmental variables

* DATA LAYER:
    * Create repositories (jdbc template repository) and interfaces
    * Add custom DataAccessException class
        * (check to see if necessary?)
    * Create mappers for AppUser, Game, Posting, Match
    * Create CRUD methods in repositories 
        * AppUserJdbcTemplateRepository
            * findAll
            * findByUsername
            * add
            * delete
            * update
        * Game (we're pulling game titles from an API)
            * findAll
            * findByGameTitle
            * add
            * delete
        * Posting
            * findAll
            * findByGameTitle
            * add
            * update
            * delete
        * Match
            * findAll
            * findById
            * add
            * delete
    * Create data tests for each repository and test CRUD methods along the way
* DOMAIN LAYER
    * Add Validation API  
    * Create Result class with generic type and a ResultType enum
    * Create Service classes for AppUser, Game, Posting, Match
    * Create service tests and test methods as you go
        * utilize the Validation API
    * (In a Controllers package)
        * create Controllers 


* SECURITY PACKAGE
    * AuthController in Controllers package
    * 

### React 
* Use npm to create react app
* 

## Research Needed
* figure out how to have a search bar that autofills with games from a game API so that game names are consistent when added to list of favorite games
* figure out if BotPress works for our purposes
* look into GreenSocks documentation
* look into how to handle matches table and if having two foreign keys from the same table, but with an alias, will work

## Stretch Goals
* favorite game genres in app_user
* game console field in app_user



