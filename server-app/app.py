
import re
import math
import numpy as np

data = [{'id': 2, 'name': '№ GY 001', 'color': 'rgb(236, 177, 21)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}, 
{'id': 3, 'name': '№ LC 001', 'color': 'rgb(238, 177, 26)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}, 
{'id': 4, 'name': '№ AQ 090', 'color': 'rgb(2, 51, 66)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}, 
{'id': 5, 'name': '№ AQ 030', 'color': 'rgb(0, 169, 140)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}, 
{'id': 6, 'name': '№ AQ 040', 'color': 'rgb(2, 179, 171)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}, 
{'id': 7, 'name': '№ CN 001', 'color': 'rgb(230, 171, 141)', 'brand': 'Kodi Professional', 'brandId': 1, 'price': 125}]

class Color:
    def __init__(self, color):
        color_components = re.search("rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)", color)
        self.red = int(color_components.group(1))
        self.green = int(color_components.group(2))
        self.blue = int(color_components.group(3))

target_color = Color("rgb(231, 177, 20)")

def get_color_difference(item):
    current_color = Color(item["color"])
    return math.sqrt(pow((target_color.red - current_color.red), 2) 
        + pow((target_color.green - current_color.green), 2) 
        + pow((target_color.blue - current_color.blue), 2))

for item in data:
    item['dif'] = get_color_difference(item)

# dtype ={'names': ('id', 'name', 'color', 'brand', 'brandId', 'price', 'dif'),
#         'formats': (int, 'S10', 'S20', 'S20', int, int, float)}
# dtype =[{'id': int, 'name': 'S10', 'color': 'S20', 'brand': 'S20', 'brandId': int, 'price': int, 'dif': float}]
# dtype = [('id', int), ('name', 'S10')]
# array = np.array(data, dtype=dtype)

# array = np.array([(2, 's GY 001')], dtype=dtype)

# array = np.array(data)
# print(np.sort(array))
# print(np.sort(array, 'dif'))

def partition(arr, low, high):
    i = (low-1)
    pivot = arr[high]
 
    for j in range(low, high):
        if arr[j]['dif'] <= pivot['dif']:
 
            i = i+1
            arr[i], arr[j] = arr[j], arr[i]
 
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return (i+1)
 
def quickSort(arr, low, high):
    if len(arr) == 1:
        return arr
    if low < high:
 
        pi = partition(arr, low, high)
 
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)

n = len(data)
quickSort(data, 0, n-1)
print(data)