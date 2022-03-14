## :ledger: A Simple Inventory Management Service

### What does this do ?

It gives you simple REST endpoints to add, modify, list and remove products from the inventory.

### Notable Integrations / Features
  - :heavy_check_mark: Hapi.js
  - :heavy_check_mark: SwaggerUI
  - :heavy_check_mark: NeDB - Ligtweight NoSQL db on the filesystem (alternative to SQLite)
  - :heavy_check_mark: JWT Authentication for protected routes
  - :construction: GrahphQL Endpoint to query the inventory
  - :construction: Complete Test Spec for the API
  - :construction: Server Side Caching


### Development Usage
1. Clone the repository and install all the dependencies

    `$ npm i`

2. Run (runs in watch mode)

    `$ npm start`

3. :book: Swagger Documentation URL: http://localhost:9090/documentation


### Production Usage
1. Clone the repository 
   - Run 
       `$npm run serve`
    

### Project Structure
```bash
src
├── controllers
│   ├── AccountsController.js
│   └── ProductsController.js
├── persistence
│   └── index.js
├── routes
│   ├── accounts-route.js
│   ├── index.js
│   └── products-route.js
├── schemas
│   ├── Product.js
│   ├── User.js
│   └── index.js
├── security
│   └── index.js
├── server.js
└── utils
    ├── HapiDocsOptions.js
    ├── HapiSwaggerOptions.js
    ├── index.js
    └── logger.js
 ```
