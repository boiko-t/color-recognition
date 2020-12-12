def populate_brands(records):
    brands = list()
    for row in records:
        brands.append({"id": row[0], "name": row[1], "price": row[2]})
    return brands

def populate_products(records):
    products = list()
    for row in records:
        products.append(populate_product(row))
    return products

def populate_product(row):
    return {"id": row[0], "name": row[1], "color": row[2], "brand": row[3], "brandId": row[4], "price": row[5]}