const express = require('express')
const router  = express.Router()
const {ensureAuthenticated} = require('../config/auth') 
const assert = require('assert')


const main_logic = require('./indexRoutes/mianLogicRoute')
router.use('/', main_logic);


const mongoose = require('mongoose')
mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology : true
})
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB.')
})


router.get('/dashboard',ensureAuthenticated,(req, res) => {
    res.render('corePages/dashboard',{
        user: req.user
    });
})
router.get('/newStuff', (req, res) => {
    res.render('newStuff')
})
router.get('/getStuff', (req, res) => {
    res.render('corePages/getStuff')
})
router.get('/getStuff', (req, res) => {
    res.render('getStuff')
})


const Users = db.collection('users')    //These are the names of the collections in the database.


//==================================================================== getUsersStuff
router.get('/getUsers', (req, res) => { 
    Users.find().toArray()
        .then(results =>{
            res.render('getPages/Users', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================================== getUsersStuff
const Books = db.collection('Books')
//==================================================================== presentationPage
router.get('/presentationPage', (req, res) => { 
    Books.find().toArray()
    .then(results =>{
        res.render('getpages/presentationPage', { Books : results})
    })
    .catch(error => console.error(error))
})
//==================================================================== presentationPage


module.exports = router