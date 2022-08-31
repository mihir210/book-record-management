const express = require('express');
const userrouter = require('./routes/users');
const booksrouter = require('./routes/books');
const dotenv = require('dotenv');
const dbcon = require('./db');

dotenv.config();



const app = express();
dbcon();

const port = 4552;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
})


app.use('/users', userrouter);
app.use('/books', booksrouter);




app.get("*", (req, res) => {
    res.status(404).json({
        message: "this route does not exist"
    })
})


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})