import sqlite3
from sqlite3 import Error

sql_create_brands_table = """
    CREATE TABLE IF NOT EXISTS Brands (
        id integer PRIMARY KEY,
        name text,
        price_category integer
    );
"""
sql_create_products_table = """
    CREATE TABLE IF NOT EXISTS Products (
        id integer PRIMARY KEY,
        name text,
        color text,
        brand_id integer,
        FOREIGN KEY (brand_id) REFERENCES Brands (id)
    );
"""
sql_create_users_table = """
    CREATE TABLE IF NOT EXISTS Users (
        id integer PRIMARY KEY,
        name text,
        email text,
        is_admin boolean
    );
"""
sql_create_fav_products_table = """
    CREATE TABLE IF NOT EXISTS FavoriteProducts (
        id integer PRIMARY KEY,
        product_id integer,
        user_id integer,
        FOREIGN KEY (product_id) REFERENCES Products (id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
    );

"""
sql_create_fav_price_categories_table = """
    CREATE TABLE IF NOT EXISTS PriceCategories (
        id integer PRIMARY KEY,
        name text,
        price integer
    );
"""

def create_table(connection, create_table_sql):
    try:
        cursor = connection.cursor()
        cursor.execute(create_table_sql)
    except Error as e:
        print(e)
    finally:
        cursor.close()

def init_database(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
        create_table(connection, sql_create_brands_table)
        create_table(connection, sql_create_products_table)
        create_table(connection, sql_create_users_table)
        create_table(connection, sql_create_fav_products_table)
        create_table(connection, sql_create_fav_price_categories_table)
        connection.commit()
        print("CONNECTED to DB")
        return connection
    except Error as e:
        print(e)