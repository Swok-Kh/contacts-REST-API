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

### Contacts

- GET **api/contacts** - get all contacts
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
