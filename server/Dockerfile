FROM node:lts-alpine

COPY . /server/

RUN npm install --prefix server --only=production

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000