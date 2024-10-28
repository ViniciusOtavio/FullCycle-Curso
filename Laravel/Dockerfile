#cria e roda o php no docker
#docker run -it --name php php:7.4-cli bash
FROM php:7.4-cli

#define o diretório de trabalho do container
WORKDIR /var/www

#atualiza o repositorio
RUN apt-get update

#instala o zip
RUN apt-get install libzip-dev -y

#Instala o php com extensão zip
RUN docker-php-ext-install zip

#instalação do composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"

#instala o laravel
RUN php composer.phar create-project --prefer-dist laravel/laravel laravel

#paramentros: nome do executavel : Pasta : o comando
ENTRYPOINT [ "php" ,"laravel/artisan", "serve"]
CMD [ "--host=0.0.0.0" ]