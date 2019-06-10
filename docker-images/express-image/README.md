# Step 2: Dynamic HTTP server with express.js

Here is the repo with everything needed to build the Docker image.

## Demo

First, we must install the npm depedencies :

`npm install` (in the src folder)

To do the demo, we must build the image :

`docker build -t res/express_countries .`

Then, we must run the container :

`docker run -p 9090:3000 res/express_countries`

The container is run with a port mapping

Finally, we can see the result in a web browser, at the address `192.168.99.100:9090`

We generate a list of country.

