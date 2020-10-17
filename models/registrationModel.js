const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const passportLocalMongoose = require('passport-local-mongoose');

//schema definition
const registerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Please Enter first name'
    },
    lastname: String,
    password: {
        type: String,
        required: 'Please Enter password'
    },
    gender: String,
    country: String,
    city: String
})
registerSchema.add({ username: {type: String, unique: true, required: 'Please Enter first name' } });

registerSchema.plugin(passportLocalMongoose);
// Model creation
module.exports = mongoose.model("Register", registerSchema)

