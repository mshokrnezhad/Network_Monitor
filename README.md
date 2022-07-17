# Net_Mon
A RESTful network monitoring component for measuring and reporting network link latencies. 

It is assumed that the IP addresses of network nodes and their names are available in advance.

The component consists of the following two modules: 

1- A JavaScript agent to be placed on each network node to measure latency between this node and the others.

2- A Node.js Express server to collect latencies from the agents and return aggregated reports using RESTful APIs.

How to run?


