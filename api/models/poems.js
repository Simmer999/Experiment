const mongoose = require('mongoose');

const poemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    body: String
});

module.exports = mongoose.model('poems', poemSchema);