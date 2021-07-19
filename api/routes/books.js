const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
// .set('debug', true)
const db = mongoose.connection;


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Book = require('../models/books');
const { findById } = require('../models/books');

const Books = db.collection('Books')    //These are the names of the collections in the database.



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

router.get('/bookPresentation', (req, res) => {
    db.collection('Books')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        console.log(results)
        res.render('getPages/bookPresentation', { Books: results })  
    })
    .catch(error => console.error(error))
})

router.get('/BookList', (req, res) => { 
    Books.find().toArray()
        .then(results =>{
            res.render('getPages/BookList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================================== GETs



//==================================================================== POST
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
//==================================================================== POST
router.get('/Books/:id', (req, res) => {
    
    const id = req.params.id
    console.log(id)
    // console.log(req.params.id)
    db.collection('Books').find(id).toArray()
    .then(result => {
    res.render('details/bookDetails', { Book: result, title: 'Book Details' }) 
    // console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//========================================================#4
// router.get('/Books/60eba42c0535ed265cd97560', (req, res) =>{
//     res.render('Books/60eba42c0535ed265cd97560')
// })


module.exports = router;