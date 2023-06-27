drop database if exists gamer;
create database gamer;
use gamer;

create table gender (
	gender_id int primary key auto_increment,
	gender_type varchar(20) not null
);

create table app_user (
	app_user_id int primary key auto_increment,
	email varchar(255) not null,
    `password` varchar(30) not null,
    gamer_tag varchar(20) not null,
    birth_date date not null,
    bio varchar(1000) not null,
	enabled boolean not null,
    gender_id int not null,
    constraint fk_app_user_gender_id
		foreign key (gender_id)
		references gender(gender_id)
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
		foreign key (app_user_id_one)
		references app_user(app_user_id),
	constraint fk_match_app_user_id_two
		foreign key (app_user_id_two)
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



drop table if exists app_user_role;
drop table if exists app_role;
drop table if exists app_user;

-- create table app_user (
--     app_user_id int primary key auto_increment,
--     username varchar(50) not null unique,
--     password_hash varchar(2048) not null,
--     enabled bit not null default(1)
-- );

-- create table app_role (
--     app_role_id int primary key auto_increment,
--     `name` varchar(50) not null unique
-- );

-- create table app_user_role (
--     app_user_id int not null,
--     app_role_id int not null,
--     constraint pk_app_user_role
--         primary key (app_user_id, app_role_id),
--     constraint fk_app_user_role_user_id
--         foreign key (app_user_id)
--         references app_user(app_user_id),
--     constraint fk_app_user_role_role_id
--         foreign key (app_role_id)
--         references app_role(app_role_id)
-- );

insert into app_role (`name`) values
    ('USER'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, enabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 1);

insert into app_user_role
    values
    (1, 2),
    (2, 1);