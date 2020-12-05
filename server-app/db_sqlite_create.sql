CREATE TABLE Products (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	color text,
	brandId binary
);

CREATE TABLE Users (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text,
	email text,
	is_admin boolean
);

CREATE TABLE Brands (
	id integer PRIMARY KEY AUTOINCREMENT,
	name string,
	price_category integer
);

CREATE TABLE FavoriteProduscts (
	id integer PRIMARY KEY AUTOINCREMENT,
	product_id integer,
	user_id integer
);

CREATE TABLE PriceCategories (
	id integer PRIMARY KEY AUTOINCREMENT,
	name text PRIMARY KEY AUTOINCREMENT,
	price integer PRIMARY KEY AUTOINCREMENT
);

