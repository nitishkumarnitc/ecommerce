# Vedantu Assignment 

This project uses the following technologies:

- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database


## Configuration
Make sure to add your own `MONGOURI`  

```javascript
go to server/config/keys
module.exports = {
  mongoURI: "YOUR_MONGO_URI_HERE",
  secretOrKey: "secret"
};
```

## Quick Start

```javascript
// Install dependencies
nvm use
npm install 

// Run client & server with concurrently
npm start

// Server runs on http://localhost:5000 
```

## Apis 

```javascript
http://localhost:5000/api/order

method : post

data: {
  orders:[[{"itemId":1,"quantity":2},{"itemId":2,"quantity":2}]]
}
```
