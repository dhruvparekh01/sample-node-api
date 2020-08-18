# Sample node api
Boilerplate code to make a REST API with JWT authentication using express and mongodb.

## To get started:
Make a .env file in the root folder. It contains the the following environment variables:
```
DB_URI: URI for your MongoDB database
JWT_SECRET: Secret key for signing JWT tokens
JWT_ALGORITHM: Algorithm used to sign the JWT tokens
JWT_EXPIRES_IN: Lifetime of JWT tokens
```

## Authentication:
### Register:
1) Make a post request to ```/auth/register``` with the following keys in request body: firstName, lastName, email, username, password and passwordConfirm.
2) The response will be a JWT token. For all the subsequent requests, use this value as Bearer Token in the Authorization Header.

### Login:
1) Make a post request to ```/auth/login``` with username and password keys in request body.
2) The response will be a JWT token. For all the subsequent requests, use this value as Bearer Token in the Authorization Header.

### Logout:
Send a post request to ```/auth/logout``` and remove the JWT token from the header.
