const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
// .set('debug', true)

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB #3.')
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Book = require('../models/books');
const { response } = require('express');
const { findById } = require('../models/books');


const Books = db.collection('Poems')    //These are the names of the collections in the database.

//================================================ Sandbox
router.get('/add-book', (req, res) => {
    const book = new Book({
        title: 'new bb book',
        author: 'poiu',
        body: 'qeroiuqwerpoi'
    })
    book.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
router.get('/all-Books', (req, res) => {
    Book.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
router.get('/single-book', (req, res) =>{
    Book.findById('60ecf8a3f0955b10582b0305')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})
//================================================ Sandbox

//==================================================================== GETs 
router.get('/books', (req, res) => {
    res.render('newPages/newBook')
})

router.get('/newBooks', (req, res) => {
    Books.find().toArray()
    .then(results =>{
        res.render('newPages/newBook', { entries : results})
    })
    .catch(error => console.error(error))
})



//==================================================== Code for BookList
router.get('/BookList', (req, res) => { 
    Books.find().toArray()
        .then(results =>{
            res.render('getPages/BookList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================== Code for BookList
//==================================================== Code for bookPresentaion
router.get('/bookPresentation', (req, res) => {
    db.collection('Books')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('getPages/bookPresentation', { Books: results })  
    })
    .catch(error => console.error(error))
})
//==================================================== Code for bookPresentaion
//==================================================== Code for bookDetails
router.get('/Books/:id', (req, res) => {
    const id = req.params.id 
    // JSON.stringify(id)
    console.log(req.params)
    console.log(id)
    // db.collection('Books').find( { } ).toArray()
    Book.findById(id)
    
    .then(result => { 
    console.log(Book)    
    res.render('details/bookDetails', { Book: result }) 
    console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//==================================================== Code for bookDetails
//==================================================== POST for newBook
router.post('/newbook', (req, res ) => {
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
  
    const data = {
        "title": title,
        "author": author,
        "body": body
    }
    db.collection('Books').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
        return res.render('corePages/directory');    
        // return res.redirect('corePages/directory') 
    });
})
//==================================================== POST for newBook


module.exports = router;