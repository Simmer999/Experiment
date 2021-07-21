const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose');
// .set('debug', true)
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB #3.')
})

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
//==================================================================== GETs
//==================================================== Code for PoemList
router.get('/PoemList', (req, res) => { 
    Poems.find().toArray()
        .then(results =>{
            res.render('getPages/PoemList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================== Code for PoemList
//==================================================== Code for poemPresentation
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
//==================================================== Code for poemPresentation
//==================================================== Code for poemDetails
router.get('/Poems/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(req.params.id)
    Poem.findById( id)
    .then(result => {
    res.render('details/poemDetails', { Poem: result }) 
    console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//==================================================== Code for poemDetails


//========================================================== POST for newPoem
router.post('/newPoem', (req, res) => {
    const poem = new Poem(req.body)
    poem.save()
    .then((result) => {
        res.render('corePages/directory')
    })
    .catch(err => {
        console.log(err)   
    })
})
//========================================================== POST for newPoem

//========================================================#4
// router.get('/Books/60eba42c0535ed265cd97560', (req, res) =>{
//     res.render('Books/60eba42c0535ed265cd97560')
// })

module.exports = router;




// router.post('/newPoem', (req, res) => {
//     const title = req.body.title;
//     const author = req.body.author;
//     const body = req.body.body;
  
//     const data = {
//         "title": title,
//         "author":author,
//         "body": body
//     }
//     db.collection('Poems').insertOne(data,function(err, collection){
//         if (err) throw err;
//         console.log("Record inserted Successfully");
//         return res.redirect('/directory');     
//     });
// })