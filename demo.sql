create table `user`(
	`id` int(10) unsigned not null auto_increment primary key,
	`username` varchar(20) not null,
	`password` char(32) not null,
	`type` tinyint(1) unsigned default '0'
);
create table `node`(
	`id` int(10) unsigned not null auto_increment primary key,
	`style` varchar(20) not null,
	`title` varchar(255) not null,
	`content` varchar(255) not null,
	`updatetime` timestamp,
	`username` varchar(20) not null	
);