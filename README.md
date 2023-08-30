# Wikibase REST API client demo

This repo demonstrates how to generate and use a TypeScript API client based on [the Wikibase REST API's OpenAPI document](https://doc.wikimedia.org/Wikibase/master/js/rest-api/).

## Installation

* build the docker image: `docker-compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) node`
* install dependencies: `docker-compose run --rm node npm i`
* download and save the WB REST API OpenAPI document as `openapi.json` in this directory: `wget https://doc.wikimedia.org/Wikibase/master/js/rest-api/openapi.json`
* to generate the client run the following two commands: 
  * `docker-compose run --rm node npx json-dereference-cli json-dereference -s openapi.json -o openapi-dereferenced.json`
  * `docker run --rm \
      -v $PWD:/local openapitools/openapi-generator-cli generate \
      -i /local/openapi-dereferenced.json \
      -g typescript-node \
      -o /local/api-client`
* you can now run the example: `docker-compose run --rm node npm run hello-api`
