const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BooksSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    overview: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: 'Unknown'
    }
})

module.exports = mongoose.model("books", BooksSchema)