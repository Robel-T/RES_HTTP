# Step 3: Reverse proxy with apache (static configuration)

Here is the repo with everything needed to build the Docker image for the container.

## Demo

First, we must install the npm depedencies :

`npm install` (in the express_image/src folder)

To do the demo, we must build the 3 images :

`docker build -t res/apache_php .` (in the apache_static folder)

`docker build -t res/express_countries .` (in the express_image folder)

`docker build -t res/apache_rp .` (in the apache-reverse-proxy folder)

Then, we must run the containers (in order) :

```
docker run -d --name apache_static res/apache_php
docker run -d --name express_dynamic res/express_countries
docker run -p 8080:80 --name apache_rp res/apache_rp
```

The container is run with a port mapping

Finally, we can see the result with telnet, with `telnet 192.168.99.100 8080`, and the command

```
GET /api/country/ HTTP/1.0
Host: lab.res.ch
```

or

```
GET / HTTP/1.0
Host: lab.res.ch
```

## The static and dynamic servers cannot be reached directly

These containers cannot be reached directly because they are in the docker environment. We can simply prove that with `telnet 172.17.0.2 80` or `telnet 172.17.0.3 3000`.

## The static configuration is fragile and needs to be improved.

This configuration is fragile because the IP addresses are hard-coded.

# Step 4: AJAX requests with JQuery

Here is the repo with everything needed to build the various images.

## Demo

First, we must install the npm depedencies :

`npm install` (in the express_image/src folder)

To do the demo, we must build the 3 images :

`docker build -t res/apache_php .` (in the apache_static folder)

`docker build -t res/express_countries .` (in the express_image folder)

`docker build -t res/apache_rp .` (in the apache-reverse-proxy folder)

Then, we must run the containers (in order) :

```
docker run -d --name apache_static res/apache_php
docker run -d --name express_dynamic res/express_countries
docker run -p 8080:80 --name apache_rp res/apache_rp
```

The third container is run with a port mapping

To reach the reverse proxy from a web browser, we need to add a line in the `hosts` file of our OS. The line is `192.168.99.100 lab.res.ch`

Finally, we can see the result with a web browser at the address `lab.res.ch/8080`. A different country is displayed every 3 seconds.

## Show AJAX requests and the content of the responses

We can see all these things with the Developer Tools on a web browser.

# Step 5: Dynamic reverse proxy configuration

Here is the repo with everything needed to build the various images.

##  A way to replace the static configuration of the reverse proxy (hard-coded IP adresses) with a dynamic configuration.

We did that with the `apache2-foreground` file, and the `config-template.php` script.

## Demo

First, we must install the npm depedencies :

`npm install` (in the express_image/src folder)

To do the demo, we must build the 3 images :

`docker build -t res/apache_php .` (in the apache_static folder)

`docker build -t res/express_countries .` (in the express_image folder)

`docker build -t res/apache_rp .` (in the apache-reverse-proxy folder)

Then, we must run the containers. We will run a lot of container. In this case, the IP addresses will not be the same as before :

```
docker run -d res/apache_php
docker run -d res/apache_php
docker run -d res/apache_php
docker run -d --name apache_static res/apache_php
docker run -d res/express_countries
docker run -d res/express_countries
docker run -d --name express_dynamic res/express_countries
```

After that, we need to know the IP addresses of the containers we want to reach. We can know them with `docker inspect express_dynamic | grep -i ipadd` and `docker inspect apache_static | grep -i ipadd`

And finally, we must run the reverse proxy container, with the IP adresses as environment variables :

`docker run -d -e STATIC_APP=IP_STATIC:PORT -e DYNAMIC_APP=IP_DYNAMIC:PORT --name apache_rp -p 8080:80 res/apache_rp`

(The IP_STATIC, IP_DYNAMIC and PORT fields need to be change)

We can see the result with a web browser at the address `lab.res.ch` 