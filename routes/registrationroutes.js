const express = require('express');
const router = express.Router();
const passport = require('passport');
const Register = require('../models/registrationModel')
var ObjectId = require('mongodb').ObjectID;
var db = require('mongodb').db;



// gets and displays a register page
router.get('/', (req, res) => {
    res.render('register')
});

// using passport for authentications
router.post('/', function(req, res) {
    Register.register(new Register(req.body), req.body.password, function(err) {
        if (err) {
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/login');
        });
    });
  });



//returns a specific page
router.get('/search', async (req, res) => {
    if (req.session.user) {
         console.log(req.session.user)
        try {
            // let allows for variable reassigment
            let items = await Register.find()
            if (req.query.city) {
                items = await Register.find({ city: req.query.city })
            }
            res.render('list', { users: items, currentUser: req.session.user })
        } catch (err) {
            res.status(500).send('Unable to search the database')
        }
    } else {
        console.log("cant find session")
        res.redirect('/login')
    }
});


//edit  items
router.post('/edit', function(req, res){
    res.render('edit-form', {user: req.userId});
    });
   
//Update Items
router.post('/update', function(req, res){
    res.render('update-form', {user: req.userId});
    });
     
   

//deletes a specific item
router.post('/delete', async (req, res) => {
    try {
        await Register.deleteOne({ _id: req.body.id })
        res.redirect('back')
    } catch (err) {
        res.status(500).send('unable to delete from database')
    }
});

// Updated Items
router.post("/updated", (req, res) => {
    res.render('updated', {user: req.userId});
  });
  
// Edited Items
router.post("/edited", (req, res) => {
res.render('edited', {user: req.userId});

});


module.exports = router;




