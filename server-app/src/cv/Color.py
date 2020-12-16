import re
import math

class Color:
    def __init__(self, color):
        color_components = re.search("rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)", color)
        self.red = int(color_components.group(1))
        self.green = int(color_components.group(2))
        self.blue = int(color_components.group(3))

def get_color_difference(target_color, item):
    current_color = Color(item["color"])
    return math.sqrt(pow((target_color.red - current_color.red), 2) 
        + pow((target_color.green - current_color.green), 2) 
        + pow((target_color.blue - current_color.blue), 2))