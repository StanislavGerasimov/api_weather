docker-compose down

docker-compose build

docker-compose up -d

echo -e "\n\033[1;32mApplication is running!\033[0m"
echo -e "\n\033[1mRunning containers:\033[0m"
docker-compose ps

echo -e "\n\033[1mAccess the application at:\033[0m"
echo -e "Client: \033[4;34mhttp://localhost:3000\033[0m"
echo -e "Server API: \033[4;34mhttp://localhost:5000\033[0m"
echo -e "MongoDB: \033[4;34mmongodb://localhost:27017/weather\033[0m"

echo -e "\n\033[1mTailing logs (Ctrl+C to exit)...\033[0m"
docker-compose logs -f