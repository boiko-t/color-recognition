PROJECT_ID=$(gcloud config get-value project)
echo $PROJECT_ID

DOCKER_IMG="gcr.io/$PROJECT_ID/app"
echo $DOCKER_IMG

cd src

gcloud builds submit --tag $DOCKER_IMG --timeout=10000

gcloud container images list

REGION="europe-west1"
gcloud run deploy app --image $DOCKER_IMG --platform managed --region $REGION --allow-unauthenticated