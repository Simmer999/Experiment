const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    _id: { type: String},
  
    title: {
        type: String,
        required: true
    } ,
    author:{
        type: String,
        required: true
    } ,
    body: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema, 'Book');

module.exports = Book
// This goes to routes/books.js. (const Book = require('../models/books');)