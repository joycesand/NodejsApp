const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
const mongodb = require("mongodb");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Register = require('./models/registrationModel')
const app = express();


// Middle ware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//use sessions for tracking logins
app.use(session({
    secret: 'thesecret`',
    resave: true,
    saveUninitialized: false
}));

passport.use(new LocalStrategy(Register.authenticate()));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Register.findById(id, function(err, user) {
        done(err, user);
    });
});

//mongoose db connection
mongoose.connect("mongodb://localhost:27017/demo-db", { useNewUrlParser: true, useUnifiedTopology: true });




// import routes
const registrationRoutes = require('./routes/registrationroutes');
app.use('/register', registrationRoutes);
const loginRoutes = require('./routes/loginroutes');
app.use('/login', loginRoutes);


//logout
app.post('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                // failed to destroy session
            } else {
                return res.redirect('/login');
            }
        })
    }

})


//configuring mongodb and connecting to mongo campus
var MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/demo-db";

MongoClient.connect(
    url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err, client) => {
        // call back
        if (err) return console.log(err); // checking for error
        db = client.db("update");
        app.listen(3001, () => {
            console.log("Mongodb server Listening at 3001");
        });
    }
);


// Listening for requests: the server!
// app.listen(3001, () => {
//     console.log('Server is listening.....');
// });