#Build from official node image at version 12.10.0
FROM node:16.10.0
#The working dir path
WORKDIR /home/node
#Copy the api directory inside the working directory
COPY ./api ./
#Copy the api directory inside the working directory
COPY ./app/build ./dist/build
#Expose the port 3000 used by the backend
RUN npm install --only=production
EXPOSE 3001
#Launch the node command externally from npm to prevent him swallowing logs
CMD ["node", "dist/server.js"]