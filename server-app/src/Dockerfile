# Use an official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9-buster

# Install production dependencies.
RUN pip install --upgrade pip
RUN pip install numpy
RUN pip install Flask flask_cors gunicorn KMeans opencv-python-headless scikit-learn

# Copy local code to the container image.
WORKDIR /app
# WORKDIR /usr/src/app
COPY . /app

# Service must listen to $PORT environment variable.
# This default value facilitates local development.
ENV PORT 8080
# EXPOSE 8000

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 app:app
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
