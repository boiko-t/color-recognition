from .Database import Database
from .populate import populate_brands, populate_products

db_cursor = Database().connect()

def get_brands():
    result = db_cursor.execute("""SELECT Brands.id, Brands.name, PriceCategories.price 
        FROM Brands
        LEFT JOIN PriceCategories ON Brands.price_category = PriceCategories.id""").fetchall()
    return populate_brands(result)

def get_products():
    result = db_cursor.execute("""SELECT Products.id, Products.name, Products.color, Brands.name as brand_name, PriceCategories.price
                                    FROM Products
                                    LEFT JOIN Brands ON Products.brand_id = Brands.id
                                    LEFT JOIN PriceCategories on Brands.price_category = PriceCategories.id""").fetchall()
    return populate_products(result)