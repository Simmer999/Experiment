const mongoose = require('mongoose');
const Schema = mongoose.Schema





const EssaySchema =new Schema({
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
    },
        Collection_title: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Essay = mongoose.model('Essay', EssaySchema, 'Essays');

module.exports = Essay





