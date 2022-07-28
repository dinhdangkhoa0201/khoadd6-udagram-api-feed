docker build -t udagram-api-feed .
docker tag udagram-api-feed dinhdangkhoa0201/udagram-api-feed
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push dinhdangkhoa0201/udagram-api-feed
