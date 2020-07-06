const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');

const app = express();

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// connect to db and log if there is an error
mongoose.connect(db.url, options).
    catch(error => console.log(error));

// listen for error events on the connection
mongoose.connection.on('error', err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up the router
const router = require('./routes/index')
app.use('', router);

const port = 8000;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
