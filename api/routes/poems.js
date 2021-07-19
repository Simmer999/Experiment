const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
// .set('debug', true)
const db = mongoose.connection;


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Poem = require('../models/poems');

const Poems = db.collection('Poems')    //These are the names of the collections in the database.



//==================================================================== GETs 
router.get('/poems', (req, res) => {
    res.render('newPages/newPoem')
})

router.get('/newPoems', (req, res) => { 
    Poems.find().toArray()
    .then(results =>{
        res.render('newPages/newPoem', { entries : results})
    })
    .catch(error => console.error(error))
})

router.get('/poemPresentation', (req, res) => {
    db.collection('Poems')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('getPages/poemPresentation', { Poems: results })  
    })
    .catch(error => console.error(error))
})

router.get('/PoemList', (req, res) => { 
    Poems.find().toArray()
        .then(results =>{
            res.render('getPages/PoemList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================================== GETs



//==================================================================== POST
router.post('/newPoem', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
  
    const data = {
        "title": title,
        "author":author,
        "body": body
    }
    db.collection('Poems').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
        return res.redirect('/directory');     
    });
})

//==================================================================== POST
router.get('/Poems/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.params.id)
    Book.findById( id)
    .then(result => {
    res.render('details', { Poem: result, title: 'Poem Details' }) 
    console.log(result)
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