# Matcha
## Table of contents
- [Run the project](#run-the-project)
  - [Launch Database](#launch-database)
  - [Install dependencies](#install-dependencies)
- [Authors](#authors)

## Run the project
### Launch Database
The database is based on Neo4j and is launched on a Docker container.
To run the Docker container using `docker-compose`:
```bash
docker-compose -f ./api/neo4j.yml up
```
The front use yarn.
To run the front end:
```bash
cd ./app
yarn start
```
The back is based on Node and is launched with nodemon for developpment purpose.
To run the back:
```bash
cd ./api
nodemon
```

### Install dependencies
This project is using `yarn workspaces`.
A script has been added to install every element in a single command:
```bash
yarn install
```

If you still want to install dependencies independantly, you still can do:
```bash
yarn workspace api install
# or
yarn workspace app install
```

## Run the project (for rode)
open 3 new terminal
terminal 1
```bash
cd api
npm install (uniquement si tu ne las pas encore fait)
nodemon
```
terminal 2
```
cd app
yarn install (uniquement si tu ne las pas encore fait)
yarn start
```
terminal 3
```
cd api
echo "NEO4J_LOGIN=neo4j" > .env
echo "NEO4J_PASSWORD=matcha" >> .env
echo "NEO4J_ADDRESS=0.0.0.0" >> .env
echo "NEO4J_PORT=7687" >> .env
docker-compose -f neo4j.yml up 
```

## Authors
fldoucet
edjubert
