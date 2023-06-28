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
