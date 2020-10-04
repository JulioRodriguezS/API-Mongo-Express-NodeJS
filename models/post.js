const { mongo } = require('mongoose')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    listing_url:{
        type: String,
        required: false
    },
    name:{
        type:String,
        required: false
    },
    summary:{
        type:String,
        required: false
    },
    space:{
        type:String,
        required: false
    },
    description:{
        type:String,
        required: false
    },
    neighborhood_overview:{
        type:String,
        required: false
    },
    notes:{
        type:String,
        required: false
    }
})

module.exports = mongoose.model('posts', postSchema)