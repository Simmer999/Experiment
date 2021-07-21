const mongoose = require('mongoose');
const Schema = mongoose.Schema





const PoemSchema =new Schema({
    // // _id: mongoose.Schema.Types.ObjectId,
    // _id: { type: String},

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
}, { timestamps: true})

const Poem = mongoose.model('Poem', PoemSchema, 'Poems');

module.exports = Poem