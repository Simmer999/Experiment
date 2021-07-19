const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
// .set('debug', true)
const db = mongoose.connection;


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Essay = require('../models/essays');

const Essays = db.collection('Essays')  //These are the names of the collections in the database.



//==================================================================== GETs 
router.get('/essays', (req, res) => {
    res.render('new_essayCol')
})

router.get('/newEssays', (req, res) => { 
    Essays.find().toArray()
    .then(results =>{
        res.render('newPages/newEssays', { entries : results})
    })
    .catch(error => console.error(error))
})

router.get('/essayPresentation', (req, res) => {
    db.collection('Essays')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        console.log(results)
        res.render('getPages/essayPresentation', { Essays: results })  
    })
    .catch(error => console.error(error))
})

router.get('/EssayList', (req, res) => { 
    Essays.find().toArray()
        .then(results =>{
            res.render('getPages/EssayList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================================== GETs



//==================================================================== POST
router.post('/newEssays', function(req,res){
    const Collection_title = req.body.Collection_title;
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
    const data = {
        "Collection_title": Collection_title,
        "title": title,
        "author":author,
        "body": body}
    db.collection('Essays').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
        return res.redirect('/directory');     
    });
})

//==================================================================== POST
router.get('/Essays/:id', (req, res) => {
    const id = req.params.id
        console.log(id)
        console.log(req.params.id)
    Essay.findById( id)
    .then(result => {
    res.render('details', { Essay: result, title: 'Essay Collections Details' }) 
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