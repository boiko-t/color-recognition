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