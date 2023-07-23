create extension pgcrypto;

create table if not exists garden (
  garden_id int generated always as identity primary key,
  name varchar ( 255 )
);

create table if not exists invite (
  invite_code varchar (6) primary key,
  garden_id int,
  foreign key (garden_id) references garden(garden_id)
);

create table if not exists users (
  user_id int generated always as identity primary key,
  email varchar ( 255 ) unique not null,
  garden_id int,
  foreign key (garden_id) references garden(garden_id)
);

create table if not exists veg (
  veg_id int generated always as identity primary key,
  garden_id int,
  name varchar ( 255 ),
  status varchar (10),
  foreign key (garden_id) references garden(garden_id)
);

create table if not exists harvest (
  harvest_id int generated always as identity primary key,
  veg_id int,
  date_of_harvest date,
  amount int,
  weight decimal,
  foreign key (veg_id) references veg(veg_id)
);