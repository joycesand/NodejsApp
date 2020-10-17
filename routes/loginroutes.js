const express = require('express');
const router = express.Router();
const passport = require('passport');
// const Register = require('../models/registrationModel')

// gets and displays a register page
router.get('/', (req, res) => {
    res.render('login')
})

// submits a login page information
//router.post('/', async(req, res) => {
    // try{
    //     const user = await Register.authenticate(req.body.username, req.body.password);
    //     req.session.user = user;
    //     res.redirect('register/search')
    // }catch{
    //      res.render('login',{ error: "Failed to login, please try again" })
    // }
//})


router.post('/', passport.authenticate('local'), function(req, res) {
    req.session.user = req.user;
    res.redirect('/register/search');
});

module.exports = router; 