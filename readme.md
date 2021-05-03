## Contacts REST-API

### _Endpoints_

### Users

- POST **/users/signup** - user signUp, required body:

  ```
  {
    "email": String!,
    "password": String!
    "subscription": String // one of 'starter', 'pro', 'business'
  }
  ```

- POST **/users/login** - user login, required body:

  ```
  {
    "email": String!,
    "password": String!
  }
  ```

- POST **/users/logout** - user login, required headers:

  ```
  {
    "Authorization": token
  }
  ```

- GET **/users/current** - user login, required headers:

  ```
  {
    "Authorization": token
  }
  ```

- PATCH **/users** - user subscription update, required body:

  ```
  {
    "subscription": String!, // one of 'starter', 'pro', 'business'
  }
  ```

### Contacts

- GET **api/contacts** - get contacts. Supports pagination and filter by
  favorite (default pagination settings: limit - 10, page - 1).

  Pagination examples:

  - GET **api/contacts?page=2&limit=5** - get contacts on page 2 with limit 5
    per page

  Filter examples:

  - GET **api/contacts?favorite=true** - get contacts where favorite=true

- GET **api/contacts/:contactId** - get one contact by id
- POST **api/contacts** - add contact, required body:
  ```
  {
    "name": String!,
    "email": String!,
    "phone": String!,
    "favorite": Boolean
  }
  ```
- DELETE **api/contacts/:contactId** - remove contact by id
- PATCH **api/contacts/:contactID/favorite** - update contact favorite,required
  body:
  ```
  {
    "favorite": Boolean!
  }
  ```
- PUT **api/contacts** - update contact, required body:
  ```
  {
    "name": String,
    "email": String,
    "phone": String,
    "favorite": Boolean
  }
  ```

### Scripts:

- `npm start` &mdash; start in production mode
- `npm run start:dev` &mdash; start in development mode
- `npm run lint` &mdash; eslint
- `npm lint:fix` &mdash; eslint + fix
