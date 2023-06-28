drop database if exists gamer_test;
create database gamer_test;
use gamer_test;

create table app_user (
	app_user_id int primary key auto_increment,
	email varchar(255) not null,
    `password` varchar(30) not null,
    gamer_tag varchar(20) not null,
    birth_date date not null,
    bio varchar(1000) not null,
	enabled boolean not null,
    gender_type varchar(20) not null
);

create table app_role (
	app_role_id int primary key auto_increment,
	role_name varchar(10) not null
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint fk_app_user_role_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_app_user_role_app_role_id
		foreign key (app_role_id)
		references app_role(app_role_id)
);

create table `match` (
    match_id int primary key auto_increment,
    user_id_one int not null,
    user_id_two int not null,
    date_match date not null,
    constraint fk_match_app_user_id_one
		foreign key (user_id_one)
		references app_user(app_user_id),
	constraint fk_match_app_user_id_two
		foreign key (user_id_two)
		references app_user(app_user_id)
);

create table game (
    game_id int primary key auto_increment,
    game_title varchar(255) not null
);

create table app_user_game (
    app_user_id int not null,
    game_id int not null,
    constraint fk_app_user_game_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_app_user_game_game_id
		foreign key (game_id)
		references game(game_id)
);

create table posting (
    posting_id int primary key auto_increment,
    app_user_id int not null,
    game_id int not null,
    header varchar(255) not null,
    `description` varchar(5000) not null,
    date_posted date not null,
    constraint fk_posting_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id),
	constraint fk_posting_game_id
		foreign key (game_id)
		references game(game_id)
);



-- drop table if exists app_user_role;
-- drop table if exists app_role;
-- drop table if exists app_user;




delimiter //
create procedure set_known_good_state()
begin
	delete from `match`;
    alter table `match` auto_increment = 1;
    delete from posting;
	alter table posting auto_increment = 1;
    delete from app_user_game; 
    delete from app_user_role;
    delete from app_user;
    alter table app_user auto_increment = 1;
    delete from app_role;
    alter table app_role auto_increment = 1;
	delete from game;
	alter table game auto_increment = 1;
    
    
	insert into app_user (app_user_id, email, `password`, gamer_tag, birth_date, bio, enabled, gender_type)
		values
		(1, 'maria@alcantara.com', 'abc123', 'gt_maria', '1995-08-18', 'Hello, I love playing fps and rpg games!', true, 'FEMALE'),
        (2, 'jay@wu.com', 'abc123', 'gt_jay', '1997-09-19', 'Hello, I am a game designer that loves playing Animal Crossing New Horizons!', true, 'NONBINARY'),
        (3, 'jackie@luu.com', 'abc123', 'gt_jackie', '1999-07-17', 'Hello, I love playing league of legends!', true, 'MALE'),
        (4, 'brit@hemming.com', 'abc123', 'gt_brit', '1993-06-16', 'Hello, I love playing puzzle games!', true, 'FEMALE'),
        (5, 'scott@certain.com', 'abc123', 'gt_scott', '1991-05-15', 'Hello, I love playing adventure games!', false, 'MALE'),
        (6, 'testone@test.com', 'abc123', 'gt_one', '1990-04-14', 'Hello, I am just here for the test!', true, 'OTHER'),
        (7, 'testtwo@test.com', 'abc123', 'gt_two', '1991-03-13', 'Hello, I am just a test user!', true, 'PREFER_NOT_TO_SAY');
        
        
	insert into app_role (app_role_id, role_name)
		values
		(1, 'ADMIN'),
        (2, 'USER');
        
        
	insert into app_user_role (app_user_id, app_role_id)
		values
		(1, 2),
        (2, 2),
        (3, 2),
        (4, 1),
        (5, 2);
        
	
    insert into `match` (match_id, user_id_one, user_id_two, date_match)
		values
		(1, 2, 6, '2023-06-27'),
        (2, 3, 7, '2023-06-26');
	
    
    insert into game (game_id, game_title)
		values
		(1, 'Yakuza 0'),
        (2, 'League of Legends'),
        (3, 'Ghost Trick: Phantom Detective'),
        (4, 'Animal Crossing: New Horizons'),
        (5, 'Sims 4');
	
    
    insert into app_user_game (app_user_id, game_id)
		values
		(1, 5),
        (2, 1),
        (2, 3),
        (3, 2),
        (3, 1),
        (4, 5),
        (5, 2),
        (6, 5),
        (7, 5);
        
        
	insert into posting (posting_id, app_user_id, game_id, header, `description`, date_posted)
		values
		(1, 1, 5, 'Does anyone have any good mods?', 'Hey just wondering if anyone has and links to some good mods, thanks.', '2023-06-27'),
        (2, 1, 2, 'Looking for a carry', 'Just made a smurf and I need someone to hard carry for a few levels pleaseee', '2023-06-26'),
        (3, 2, 1, 'Found a weird bug', 'Has anyone else noticed a small bug when opening the door on level 4?', '2023-06-25'),
        (4, 2, 3, 'I need help finding a quest item', 'I reread the quest prompt and I am not understanding where this gun is located...', '2023-06-24'),
        (5, 3, 2, 'Does anyone need a carry?', 'I am bored and have time tonight to carry a n00b out there, let me know', '2023-06-23'),
        (6, 3, 2, 'The new character looks amazing', 'I am once again amazed at the new character and lore added to this game!!!', '2023-06-23'),
        (8, 4, 4, 'I have no idea what I am supposed to do...', 'This game is so confusing, why are these animals trashing my garden HELP!!', '2023-06-22'),
        (9, 5, 5, 'I made some sick living room mods', 'If anyone wants to make their living room look amazing DM me I have a link', '2023-06-21'),
        (10, 6, 5, 'What do I do if I die?', 'My toon just died trying to put a house fire out, not sure what to do?', '2023-06-20'),
        (11, 6, 5, 'Looking for friends to play with', 'I have been out of the gaming scene for a while and could use some buddies to play with!', '2023-06-19');

end //
delimiter ;
