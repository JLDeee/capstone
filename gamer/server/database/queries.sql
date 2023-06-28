-- use gamer;

-- select * from app_user;




use gamer_test;
call set_known_good_state();

select * from game;

select 
	p.posting_id, 
    u.gamer_tag, 
    g.game_title, 
    p.header, 
    p.`description`, 
    p.date_posted
from posting p
inner join app_user u on p.app_user_id = u.app_user_id
inner join app_user_game ug on u.app_user_id = ug.app_user_id
inner join game g on ug.game_id = g.game_id
order by p.date_posted;

select
	posting_id, 
    app_user_id,
    game_id,
    header,
	`description`,
    date_posted
from posting;

select p.posting_id, p.app_user_id, p.game_id, p.header, p.`description`, p.date_posted
from posting p
inner join app_user u on p.app_user_id = u.app_user_id
where u.email = 'maria@alcantara.com';

select p.posting_id, p.app_user_id, p.game_id, p.header, p.`description`, p.date_posted
from posting p
inner join game g on p.game_id = g.game_id
where g.game_title = 'Sims 4';

select posting_id, app_user_id, game_id, header, `description`, date_posted
from posting 
where date_posted = '2023-06-27';

update posting set 
	header = 'Found the weirdest bug',
	`description` = 'Has anyone else noticed a small bug when opening the door on level 4?',
    date_posted = '2023-06-25',
    game_id = 1,
    app_user_id = 2
    where posting_id = 3;

select 
	posting_id, 
    app_user_id, 
    game_id, 
    header, 
    `description`,
	date_posted
from posting;

