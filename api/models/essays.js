const mongoose = require('mongoose');

const essaySchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    _id: { type: String},

    Collection_title: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    } ,
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Essay', essaySchema, 'Essay');