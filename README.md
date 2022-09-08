
# Net_Mon
A RESTful network monitoring component for measuring and reporting network link latencies. 

It is assumed that the IP addresses of network nodes and their names are available in advance.

The component consists of the following two modules: 

- A JavaScript agent to be placed on each network node to measure latency between this node and the others.

- A Node.js Express server to collect latencies from the agents and return aggregated reports using RESTful APIs.

How to run?

1- Update .env files in both the server and agent folders regarding your configuration.

2- run "docker build . -t SERVER_NAME" in ./server to create the server docker image.

3- run "docker build . -t AGENT_NAME" in ./agent to create the agent docker image.

if using DOCKERHUB:

A- run "docker push SERVER_NAME" to upload the server docker image. (SERVER_NAME should be styled as: DOCKERHUB_NAME/A_NAME)

B- run "docker push AGENT_NAME" to upload the agent docker image. (AGENT_NAME should be styled as: DOCKERHUB_NAME/A_NAME)

4- In the server machine, run "docker run -it -p 8000:8000 SERVER_NAME" to run the server ocntainer. You will see it will start to be listening... * Make sure that port 8000 should be opened for TCP on your server.

5- In each agent machine, "docker run -it -d --env NODE_NAME=NODE_NAME AGENT_NAME" to run the agent container. * Note that NODE_NAME should be replaced regarding the node on which you run the image.

6- Now, each agent will start to ping the others and push the results to the server. 

7- To get latencies from server, use the postman collection attached to the repository

