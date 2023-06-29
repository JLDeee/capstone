drop database if exists gamer;
create database gamer;
use gamer;

create table app_user (
	app_user_id int primary key auto_increment,
	username varchar(255) not null,
    `password` varchar(2048) not null,
	enabled boolean not null default true
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

create table gamer (
	gamer_id int primary key auto_increment,
	app_user_id int not null,
    gender_type varchar(20) not null,
    gamer_tag varchar(20) not null,
    birth_date date not null,
    bio varchar(500) not null,
	constraint fk_gamer_app_user_id
		foreign key (app_user_id)
		references app_user(app_user_id)
);

create table `match` (
    match_id int primary key auto_increment,
    date_match date not null,
    gamer_1 int not null,
    gamer_2 int not null,
    constraint fk_match_gamer_1
		foreign key (gamer_1)
		references gamer(gamer_id),
	constraint fk_match_gamer_2
		foreign key (gamer_2)
		references gamer(gamer_id)
);

create table game (
    game_id int primary key auto_increment,
    game_title varchar(255) not null
);

create table gamer_game (
    gamer_id int not null,
    game_id int not null,
    constraint fk_gamer_game_gamer_id
		foreign key (gamer_id)
		references gamer(gamer_id),
	constraint fk_gamer_game_game_id
		foreign key (game_id)
		references game(game_id)
);

create table posting (
    posting_id int primary key auto_increment,
    gamer_id int not null,
    game_id int not null,
    header varchar(255) not null,
    `description` varchar(2000) not null,
    date_posted date not null,
    constraint fk_posting_gamer_id
		foreign key (gamer_id)
		references gamer(gamer_id),
	constraint fk_posting_game_id
		foreign key (game_id)
		references game(game_id)
);

-- insert into app_user (app_user_id, email, `password`, gamer_tag, birth_date, bio, enabled, gender_type)
-- 		values
-- 		(1, 'maria@alcantara.com', 'abc123', 'gt_maria', '1995-08-18', 'Hello, I love playing fps and rpg games!', true, 'FEMALE'),
--         (2, 'jay@wu.com', 'abc123', 'gt_jay', '1997-09-19', 'Hello, I am a game designer that loves playing Animal Crossing New Horizons!', true, 'NONBINARY'),
--         (3, 'jackie@luu.com', 'abc123', 'gt_jackie', '1999-07-17', 'Hello, I love playing league of legends!', true, 'MALE'),
--         (4, 'brit@hemming.com', 'abc123', 'gt_brit', '1993-06-16', 'Hello, I love playing puzzle games!', true, 'FEMALE'),
--         (5, 'scott@certain.com', 'abc123', 'gt_scott', '1991-05-15', 'Hello, I love playing adventure games!', false, 'MALE');

insert into app_user (app_user_id, username, `password`, enabled)
    values
    (1, 'maria@alcantara.com', 'abc123', true),
	(2, 'jay@wu.com', 'abc123', true),
	(3, 'jackie@luu.com', 'abc123', true),
	(4, 'brit@hemming.com', 'abc123', true),
	(5, 'scott@certain.com', 'abc123', false);
        
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
