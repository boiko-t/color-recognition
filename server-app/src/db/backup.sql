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
INSERT INTO "Products" ("name","color", "brand_id") VALUES ('№ GY 001', 'rgb(236, 177, 21)', 1),
 ('№ LC 001', 'rgb(238, 177, 26)', 1),
 ('№ AQ 090', 'rgb(2, 51, 66)', 1),
 ('№ AQ 030', 'rgb(0, 169, 140)', 1),
 ('№ AQ 040', 'rgb(2, 179, 171)', 1),
 ('№ CN 001', 'rgb(230, 171, 141)', 1),
 ('№ CN 060', 'rgb(216, 197, 191)', 1),
 ('№ CN 070', 'rgb(218, 147, 165)', 1),
 ('№ CN 080', 'rgb(111, 80, 86)', 1),
 ('№ R 001', 'rgb(238, 4, 3)', 1),
 ('№ R 080', 'rgb(193, 0, 29)', 1),
 ('№ P 040', 'rgb(255, 140, 173)', 1),
 ('№ P 070', 'rgb(251, 175, 162)', 1),
 ('№ D001', 'rgb(0, 0, 0)', 2),
 ('№ D002', 'rgb(243, 243, 243)', 2),
 ('№ D008', 'rgb(254, 198, 175)', 2),
 ('№ D016', 'rgb(246, 184, 185)', 2),
 ('№ D021', 'rgb(255, 118, 160)', 2),
 ('№ D041', 'rgb(223, 148, 178)', 2),
 ('№ D066', 'rgb(185 160 155)', 2),
 ('№ D081', 'rgb(149 24 68)', 2),
 ('№ D108', 'rgb(112 106 142)', 2),
 ('№ D140', 'rgb(147 201 211)', 2),
 ('№ D138', 'rgb(170 185 188)', 2),
 ('№ D159', 'rgb(158 226 123)', 2),
 ('№ D164', 'rgb(252 223 59)', 2),
 ('№ D166', 'rgb(253 191 70)', 2);
COMMIT;
