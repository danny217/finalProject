drop database if exists ArrowDB;
create database ArrowDB;
use ArrowDB;

create table users(
	id int auto_increment primary key,
	name varchar(255) not null unique,
	password varchar(255) not null,
	email varchar(255) not null unique,
	score int not null,
	remember_token varchar(255),
	created_at datetime,
	updated_at datetime
); 

-- create table Levels(
-- 	id int not null primary key,
-- 	background varchar(255),
-- 	enemyNum int,
-- 	enemyLvlMax int,
-- 	enemiesAllowed int,
-- 	enemyApproachSpeed int,
-- 	maxScore int

-- );

-- create table Enemies(
-- 	id int not null auto_increment primary key,
-- 	type varchar(255),
-- 	enemyLvl int,
-- 	sprite varchar(255)
-- );


-- insert into users(score)values(29400) where id = 1;

-- create table Saves(
-- 	playerId int not null,
-- 	score int not null
-- );
-- create table Items (
-- 	id int not null auto_increment primary key,
-- 	name varchar(255),
-- 	description text,
-- );

-- create table UserInventory (
-- 	itemId int,
-- 	playerId int,
-- 	quantity int,
-- 	FOREIGN KEY (itemId) REFERENCES Items(id),
-- 	FOREIGN KEY (playerId) REFERENCES Players(id),
-- 	primary key ("playerId", "itemId")
-- );