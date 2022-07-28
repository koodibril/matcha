FROM node:16.10.0
WORKDIR /home/node
COPY ./ ./
WORKDIR /home/node/app
RUN yarn
RUN yarn build
WORKDIR /home/node/api
RUN yarn
RUN yarn build
RUN mv /home/node/app/build dist/build
EXPOSE 3001
#Launch the node command externally from npm to prevent him swallowing logs
CMD ["node", "dist/server.js"]