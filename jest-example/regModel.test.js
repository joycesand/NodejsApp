const mongoose = require('mongoose')
const Register = require('../models/registrationModel')

// create test suite
describe('registration model test', () => {

 // test set up: runs before any test; in this case to create our testdb
 beforeAll( async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test-db", { useNewUrlParser: true, useUnifiedTopology: true });
        await Register.deleteMany({})
    } catch (err) {
        console.log("database error " + err)
    }
})


test('should be able to save',  async() => {
    try{
    const register = new Register({'firstname':'Joreen'})
    await register.save() 

    }catch(err){
        console.log("Saving error " + err)
    }
    const items = await Register.find({})
    expect(items.length).toBe(1)
    
})

test('should not save when first name isnt input', async () => {
    try {
        await (new Register({ lastname: 'Joreen' }).save())
    } catch (err) {
        console.log("database error " + err)
        expect(err.toString()).toBe('ValidationError: firstname: Please Enter first name')
    }
    const items = await Register.find({})
    expect(items.length).toBe(0)
})

//test tear down: some finishing work that needs to happen after the tests ran
afterEach(async () => {
        try {
            await Register.deleteMany({})
        } catch (err) {
            console.log("database error " + err)
        }
     } )
   
})