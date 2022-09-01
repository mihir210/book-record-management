const { json } = require('express');
const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');
const router = express.Router();
const {
    getAllBooks,
    getSingleBookById,
    getAllIssuedBooks
} = require('../controllers/book-controllers');




/*

route :  /books
method get
to get all books list
access : public
parameters : none
*/
router.get('/', getAllBooks)




/*

route /books/issued
method get
create a book 

parameters none
*/
router.get('/issued/by-user', getAllIssuedBooks)



/*
route books/id
method get
parameters : id
to get book by id
*/

router.get('/:id', getSingleBookById);

/*
route books/
method post
parameters : none
add a new book
*/



router.post('/', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({
            sucess: false,
            message: "No data provided"
        })
    }

    const book = books.find((each) => each.id === data.id);


    if (book) {
        return res.status(404).json({
            sucess: false,
            message: "book is already exist with this id"
        })
    }


    const allbooks = [...books, data];
    return res.status(201).json({
        sucess: true,
        message: "book added",
        data: allbooks
    })
})




/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book
 * Access: Public
 * Parameters: id
 * Data: author, name, genre, price, publisher, id
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book not found with this particular id",
        });
    }

    const updateData = books.map((each) => {
        if (each.id === id) {
            return {...each, ...data };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updateData,
    });
});




module.exports = router;