const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const passport    = require('passport');
const User        = require('./models/User');
const cors        = require('cors');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

const app         = express();

// Configure CORS
app.use(cors());
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const dbConfig = process.env.DB_URL;

// connect to db and log if there is an error
mongoose.connect(dbConfig, options).
    catch(error => console.log(error));

// listen for error events on the connection
mongoose.connection.on('error', err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

// Configuration required for passport-local-mongoose library
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set up the router
const router = require('./routes/index')
app.use('', router);

const port = 8000;
app.listen(port, () => {
    console.log("Listening on port " + port);
});
