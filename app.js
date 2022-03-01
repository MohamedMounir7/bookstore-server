//Starting server

var express = require('express')
var app = express()
var port = '3000';
const connection = require('./config/db')
const Books = require('./routes/books')
const bodyParser = require('body-parser')
const cors = require('cors')


// connect to db
connection();


// miidlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded
app.use(cors());

app.use('/api/books', Books);


// connect to server
app.listen(port , () => {
    console.log('server listening on port : ' + port);
})


