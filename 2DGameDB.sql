drop database if exists 2DGameDB;
create database 2DGameDB;
use 2DGameDB;

create table Players(
	id int auto_increment primary key,
	username varchar(255) not null unique,
	password varchar(50) not null,
	email varchar(255) not null unique, 
);

create table Levels(
	id int not null primary key,
	background varchar(255),
	enemyNum int,
	enemyLvlMax int,
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
	score int not null,
	-- itemId int not null,
	primary key ("playerId", "gameId")
);

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