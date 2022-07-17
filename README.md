# Net_Mon
A RESTful network monitoring component for measuring and reporting network link latencies. 

It is assumed that the IP addresses of network nodes and their names are available in advance.

The component consists of the following two modules: 

- A JavaScript agent to be placed on each network node to measure latency between this node and the others.

- A Node.js Express server to collect latencies from the agents and return aggregated reports using RESTful APIs.

How to run?

1- Update .env files in both the server and agent folders regarding your configuration.

2- Update miniclouds info in nodes.csv located in ./server/data.

3- run "docker build . -t DOCKERHUB_NAME/netmonserver" in ./server to create the server docker image.

4- run "docker build . -t DOCKERHUB_NAME/netmonagent" in ./agent to create the agent docker image.

5- run "docker push DOCKERHUB_NAME/netmonserver" to upload the server docker image.

6- run "docker push DOCKERHUB_NAME/netmonagent" to upload the agent docker image.

7- In the server machine, run "docker run -it -p 8000:8000 DOCKERHUB_NAME/netmonserver" to run the server ocntainer. You will see it will start to be listening...

8- In each agent machine, "docker run -it -d --env NODE_NAME=NODE_NAME DOCKERHUB_NAME/netmonagent" to run the agent container. * Note that NODE_NAME should be replaced regarding the node on which you run the image.

9- Now, each agent will start to ping the others and push the results to the server. 

10- To get latencies from server, use the postman collection attached to the repository

