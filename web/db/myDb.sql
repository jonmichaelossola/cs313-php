CREATE TABLE players (
	name varchar,
	city varchar,
	id varchar primary key,
	password varchar
)

CREATE TABLE posts (
	playerId varchar references players(id),
	time date,
	location varchar,
	description varchar
)

CREATE TABLE likes (
	player_id int references players(id),
	post_id int references posts(post_id)
);