# Laboratoire RES HTTPINFRA

## Objectives
The first objective of this lab is to get familiar with software tools that will allow us to build a complete web infrastructure. By that, we mean that we will build an environment that will allow us to serve static and dynamic content to web browsers. To do that, we will see that the apache httpd server can act both as a HTTP server and as a reverse proxy. We will also see that express.js is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, dynamic web application. We will create HTML, CSS and JavaScript assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (AJAX requests) and fetch content generated dynamically.

The third objective is to practice our usage of Docker. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images).

## Server Name

lab.res.ch

## build images

docker build --tag apache-php .

docker build --tag apache_rp .

docker build --tag express-image .

## Run images static and dynamic

docker run -d --name apache_static apache-php

docker run -d --name apache_static2 apache-php

docker run -d --name express_country express-image

docker run -d --name express_country2 express-image

## Run proxy

### First you have to check the address IP of the container, this is the how you can get it:

docker inspect apache_static    | grep -i ipaddress 

docker inspect apache_static2   | grep -i ipaddress 

docker inspect express_country  | grep -i ipaddress 

docker inspect express_country2 | grep -i ipaddress 

### And then you have the ipaddress, you can run the proxy (this is some exemple ipaddress that you can find)

docker run -d -e STATIC_APP=172.17.0.2:80 -e STATIC_APP2=172.17.0.3:80 -e DYNAMIC_APP=172.17.0.4:3000 -e DYNAMIC_APP2=172.17.0.5:3000 -p 8080:80 --name apache_rp  apache_rp 

## Management UI

when you run this container, on your browser enter lab.res.ch:9000 and clic on "local", then you have the possibility to control your Docker environment

docker run -d -p 9000:9000 -v "/var/run/docker.sock:/var/run/docker.sock" portainer/portainer

