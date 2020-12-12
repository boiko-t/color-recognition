from .Database import Database
from .populate import populate_brands, populate_products, populate_product

db_cursor = Database().connect()

def get_brands():
    result = db_cursor.execute("""SELECT Brands.id, Brands.name, PriceCategories.price 
        FROM Brands
        LEFT JOIN PriceCategories ON Brands.price_category = PriceCategories.id""").fetchall()
    return populate_brands(result)

def get_product_by_id(id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, Brands.id as brand_id, PriceCategories.price
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                    WHERE Products.id = {id}""").fetchall()
    return populate_product(result[0])

def get_products():
    result = db_cursor.execute("""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, Brands.id as brand_id, PriceCategories.price
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id""").fetchall()
    return populate_products(result)

def get_products_by_brand_id(brand_id):
    result = db_cursor.execute(f"""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, Brands.id as brand_id, PriceCategories.price
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id
                                    WHERE brand_id = {brand_id}""").fetchall()
    return populate_products(result)