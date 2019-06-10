# Step 1: Static HTTP server with apache httpd



Here is the repo with everything needed to build the Docker image.

## Demo

To do the demo, we must build the image :

`docker build -t res/apache_php .`

Then, we must run the container :

` docker run -p 9090:80 --name apache_static res/apache_php`

The container is run with a port mapping

Finally, we can see the result in a web browser, at the address `192.168.99.100:9090` :

![1560192199381](C:\Users\jaeld\AppData\Roaming\Typora\typora-user-images\1560192199381.png)

## Dockerfile

Here is the content of the Dockerfile :

<pre><code>FROM php:7.2-apache
COPY src/ /var/www/html/
</code></pre>

We simply start from the 7.2-apache image, and copy the src folder to the container (src contains the website)

## Location of apache config files

In a running container, we can reach the apache configuration files with :

`cd /etc/apache2/`