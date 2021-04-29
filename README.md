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

## Authors
fldoucet
edjubert