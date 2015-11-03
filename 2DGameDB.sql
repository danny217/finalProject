drop database if exists ArrowDB;
create database ArrowDB;
use ArrowDB;

create table Users(
	id int auto_increment primary key,
	username varchar(100) not null unique,
	password varchar(50) not null,
	email varchar(100) not null unique,
	remember_token varchar(100),
	created_at datetime,
	updated_at datetime
); 

create table Levels(
	id int not null primary key,
	background varchar(255),
	enemyNum int,
	enemyLvlMax int,
	enemiesAllowed int,
	enemyApproachSpeed int,
	maxScore int

);

create table Enemies(
	id int not null auto_increment primary key,
	type varchar(255),
	enemyLvl int,
	sprite varchar(255)
);

create table Saves(
	playerId int not null,
	currentLevelId int not null,
	score int not null
);

insert into Saves(playerId, currentLevelId, score)values(1, 1, 29400);

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