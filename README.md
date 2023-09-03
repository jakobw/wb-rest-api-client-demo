# Wikibase REST API client demo

This repo demonstrates how to generate and use a TypeScript API client based on [the Wikibase REST API's OpenAPI document](https://doc.wikimedia.org/Wikibase/master/js/rest-api/). The automatically generated API client features well-named methods, as well as parameter and return type hints. Here is an example:
```typescript
const itemId = 'Q11';
// get a label
labelsApi.getItemLabel( itemId, 'en' ).then( ( response ) => {
    console.log( `the label of "${itemId}" is "${response.body}"` );
} );
// replace a label
labelsApi.replaceItemLabel( itemId, 'en', { label: 'hello API' } );

// get all statements of this item
statementsApi.getItemStatements( itemId )
    .then( response => console.log( response.body ) );
// get all statements of this item that use P31 as the property
statementsApi.getItemStatements( itemId, 'P31' )
    .then( response => console.log( response.body ) );
```

## Installation

### With docker
* build the docker image: `docker-compose build --build-arg UID=$(id -u) --build-arg GID=$(id -g) node`
* install dependencies: `docker-compose run --rm node npm i`
* download and save the WB REST API OpenAPI document as `openapi.json` in this directory: `curl -O https://doc.wikimedia.org/Wikibase/master/js/rest-api/openapi.json`
* to generate the client run the following two commands: 
  * `docker-compose run --rm node npx json-dereference-cli json-dereference -s openapi.json -o openapi-dereferenced.json`
  * ```
    docker run --rm \
      -v $PWD:/local openapitools/openapi-generator-cli generate \
      -i /local/openapi-dereferenced.json \
      -g typescript-node \
      -o /local/api-client
    ```
* you can now run the example: `docker-compose run --rm node npm run hello-api`

### Without docker
This requires Node.js (version >= 16) and Java (version >= 11) to be installed.
* install dependencies: `npm i`
* download and save the WB REST API OpenAPI document as `openapi.json` in this directory: `curl -O https://doc.wikimedia.org/Wikibase/master/js/rest-api/openapi.json`
* to generate the client run the following two commands:
  * `npx json-dereference-cli json-dereference -s openapi.json -o openapi-dereferenced.json`
  * `npx @openapitools/openapi-generator-cli generate -i openapi-dereferenced.json -g typescript-node -o api-client`
* you can now run the example: `npm run hello-api`
