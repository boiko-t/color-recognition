from sklearn.cluster import KMeans
import cv2
from collections import Counter

def format_RGB(color):
    return f"rgb({int(color[0])}, {int(color[1])}, {int(color[2])})"

def get_colors(image, number_of_colors):
  modified_image = cv2.resize(image, (600, 400), interpolation = cv2.INTER_AREA)
  modified_image = modified_image.reshape(modified_image.shape[0]*modified_image.shape[1], 3)

  clf = KMeans(n_clusters = number_of_colors)
  labels = clf.fit_predict(modified_image)
  counts = Counter(labels)

  center_colors = clf.cluster_centers_
  ordered_colors = [center_colors[i] for i in counts.keys()]
  formatted_colors = [format_RGB(ordered_colors[i]) for i in counts.keys()]

  return formatted_colors