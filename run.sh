docker system prune -a && docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)

# запустить контейнеры в фоне
(cd gateway && docker-compose up -d rabbitmq)
(cd auth && docker-compose up -d)
(cd books && docker-compose up -d)
(cd gateway && docker-compose up -d gateway)

echo
echo
echo

# вывести информацию по контейнерам
(cd gateway && docker-compose ps)
(cd auth && docker-compose ps)
(cd books && docker-compose ps)