FROM ubuntu:20.04

ENV NODE_NAME = "MC0"

COPY ./ ./agent

WORKDIR /agent

RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y iputils-ping

RUN npm install --only=production

CMD ["node", "agent.js"]