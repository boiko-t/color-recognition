BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Brands" (
	"id"	integer,
	"name"	text,
	"price_category"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Users" (
	"id"	integer,
	"name"	text,
	"email"	text,
	"is_admin"	boolean,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Products" (
	"id"	integer,
	"name"	text,
	"color"	text,
	"brand_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("brand_id") REFERENCES "Brands"("id")
);
CREATE TABLE IF NOT EXISTS "FavoriteProducts" (
	"id"	integer,
	"product_id"	integer,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("product_id") REFERENCES "Products"("id"),
	FOREIGN KEY("user_id") REFERENCES "Users"("id")
);
CREATE TABLE IF NOT EXISTS "PriceCategories" (
	"id"	integer,
	"name"	text,
	"price"	integer,
	PRIMARY KEY("id")
);
INSERT INTO "Brands" ("id","name","price_category") VALUES (1,'Kodi Professional',2),
 (2,'Komilfo',2),
 (3,'MOON',3),
 (4,'PNB',3),
 (5,'OXXI Professional',1),
 (6,'Courage',1),
 (7,'Go',3),
 (8,'Kira Nails',2),
 (9,'Pixel',3);
INSERT INTO "PriceCategories" ("id","name","price") VALUES (1,'Economy',100),
 (2,'Standart',125),
 (3,'Luxury',100);
COMMIT;
