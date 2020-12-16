import numpy as np
import base64
import cv2

def get_image_from_file(file):
  uploaded_file = file.read()
  np_image = np.fromstring(uploaded_file, np.uint8)
  img = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  return img

def get_image_from_data(file):
   nparr = np.frombuffer(base64.b64decode(file), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
   return img