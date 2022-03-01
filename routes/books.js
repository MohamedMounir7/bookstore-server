const Book = require('../models/books')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})
const upload = multer({ storage: storage })

// create a new arabic Book
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const image = req.file;
        const body = {
            name: req.body.name,
            author: req.body.author,
            overview: req.body.overview,
            pages: req.body.pages,
            price: req.body.price,
            category: req.body.category,
            image: image.path,
            lang: req.body.lang
        }
        const newBook = await new Book(body).save()
        res.send({
            'status': 'ok',
            'new book': newBook
        })
    } catch (error) {
        res.status(500).send({
            'status': 'error',
            'error': error
        })
    }
})

// get all arabic books
router.get('/', async (req, res) => {
    try {
        const Books = await Book.find()
        const reversedBooks = Books.reverse();
        reversedBooks.forEach((book) => {
            const image = fs.readFileSync(book.image, { encoding: 'base64' })
            book.image = image
        })
        res.send({
            status: 'ok',
            data: reversedBooks
        })
    } catch (error) {
        res.send({
            status: 'error',
            error: error
        })
    }
})

// get book by id
router.get('/:id', async (req, res) => {
    try {
        const Book = await Book.find({ _id: req.params.id })
        res.send({ status: 'ok', data: Book })
    } catch (error) {
        res.send({ status: 'error', error })
    }
})


router.put('/:id', upload.none(), async (req, res) => {
    try {
        if (req.body) {
            const prevBook = await Book.findOneAndUpdate(
                { _id: req.params.id },
                req.body
            )
            const newBook = await Book.findById(req.params.id)
            if (newBook !== prevBook) {
                res.json({ status: 'ok', data: newBook })
            }
        } else {
            res.status(404).json({ status: 'error', error: 'There is no changes' })
        }
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        var delBook = await Book.findByIdAndDelete(req.params.id);
        res.json({
            'status': 'ok',
            'data': `${delBook.name}'s been deleted successfully.`
        })
    } catch (error) {
        res.send({
            'status': 'error',
            'error': `Failed to delete ${delBook.name} book. Try again.`
        })
    }
})


module.exports = router