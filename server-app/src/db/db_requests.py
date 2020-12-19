from .Database import Database
from .populate import populate_brands, populate_products, populate_product, populate_user

db_cursor = Database().connect()

def get_brands():
    result = db_cursor.execute("""SELECT Brands.id, Brands.name, PriceCategories.price 
        FROM Brands
        LEFT JOIN PriceCategories ON Brands.price_category = PriceCategories.id""").fetchall()
    return populate_brands(result)

def update_brand(brand_data):
    db_cursor.execute(f"""UPDATE Brands
                          SET name = '{brand_data['name']}',
                              price_category = {brand_data['priceCategory']['id']}
                          WHERE
                              id = {brand_data['id']}""")

def delete_brand(brand_id):
    db_cursor.execute(f"""DELETE FROM Brands
                          WHERE id = {brand_id}""")

def add_brand(brand_data):
    db_cursor.execute(f"""INSERT INTO Brands ('name','price_category')
                          VALUES('{brand_data['name']}', {brand_data['priceCategory']['id']})""")

def get_product_by_id(id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, Brands.id as brand_id, PriceCategories.price
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                    WHERE Products.id = {id}""").fetchall()
    return populate_product(result[0])

def add_product(product_data):
    db_cursor.execute(f"""INSERT INTO Products ('name','color', 'brand_id')
                          VALUES('{product_data['name']}', '{product_data['color']}', {product_data['brand']['id']})""")

def get_products(user_id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, 
                                        Brands.id as brand_id, PriceCategories.price,  
                                        FavoriteProducts.user_id == {user_id} as is_favorite
                                   FROM Products
                                   LEFT JOIN Brands ON Products.brand_id = Brands.id
                                   LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                   LEFT JOIN FavoriteProducts on FavoriteProducts.product_id = Products.id""").fetchall()
    return populate_products(result)

def get_products_by_brand_id(brand_id, user_id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, 
                                        Brands.id as brand_id, PriceCategories.price,
                                        FavoriteProducts.user_id == {user_id} as is_favorite
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                    LEFT JOIN FavoriteProducts on FavoriteProducts.product_id = Products.id
                                    WHERE brand_id = {brand_id}""").fetchall()
    return populate_products(result)

def add_user(user_data):
    db_cursor.execute(f"""INSERT INTO Users ('name','email', 'is_admin')
                          VALUES('{user_data['name']}', '{user_data['email']}', {int(user_data['isAdmin'])})""")

def get_user_by_email(email):
    result = db_cursor.execute(f"""SELECT id, name, email, is_admin
                                    FROM Users
                                    WHERE Users.email = '{email}'""").fetchall()
    return populate_user(result[0])

def get_user_favorite_products(user_id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, 
                                    Brands.id as brand_id, PriceCategories.price, 
                                    FavoriteProducts.user_id == {user_id} as is_favorite
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                    LEFT JOIN FavoriteProducts on FavoriteProducts.product_id = Products.id
                                    WHERE user_id = {user_id}""").fetchall()
    return populate_products(result)

def set_user_favorite_product(user_id, product_id):
    db_cursor.execute(f"""INSERT INTO FavoriteProducts ('product_id', 'user_id')
                          VALUES({product_id}, {user_id})""")

def remove_user_favorite_product(user_id, product_id):
    db_cursor.execute(f"""DELETE FROM FavoriteProducts
                          WHERE product_id={product_id} and user_id={user_id}""")
