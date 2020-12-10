def populate_brands(records):
    brands = list()
    for row in records:
        brands.append({"id": row[0], "name": row[1], "price": row[2]})
    return brands

def populate_products(records):
    products = list()
    for row in records:
        products.append({"id": row[0], "name": row[1], "color": row[2], "brand": row[3], "price": row[4]})
    return products