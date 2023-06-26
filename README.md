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
        * Gamer
        * Game
        * Matches
        * YouLiked
        * LikedYou
        * User (Security)
        * Role (Security)
    * Relationships:
        * Gamer-Game = Many-Many
        * Gamer-Match = One-Many
        * Gamer-YouLiked = One-Many
        * Gamer-LikedYou = One-Many
* Create file tree diagram with classes and methods that we might need
* Create Maven Project and set up pom.xml
* Create basic packages following 3-layer architecture

## Database
### MySQL
* Create database and tables for Production and Test
* (optional?) Create queries to test tables

### IntelliJ
* Create Models and Enums
    * Gamer 
    * GameCategory (Enum)
    * 

### React 
* Use npm to create react app
* 