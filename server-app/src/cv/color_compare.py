from db import db_requests
import numpy as np
from .Color import Color, get_color_difference
from utils.color_sort import sort_by_color_dif

def find_closest_color(target_color, user_id):
    data = db_requests.get_products(user_id)
    # target_product = db_requests.get_product_by_id(target_id)

    add_color_dif(data, Color(target_color))
    sort_by_color_dif(data, 0, len(data)-1)
    return data[:6]

def add_color_dif(data, target_color):
    for item in data:
        item['dif'] = get_color_difference(target_color, item)