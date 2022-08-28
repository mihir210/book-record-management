const { json } = require('express');
const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');
const router = express.Router();



/*

route :  /books
method get
to get all books list
access : public
parameters : none
*/
router.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "route found",
        data: books
    })
})




/*

route /books/issued
method get
create a book 

parameters none
*/
router.get('/issued/by-user', (req, res) => {
    const userWithissuedbooks = users.filter((each) => {
        if (each.issuedBook) return each;
    })

    const issuedbook = [];

    userWithissuedbooks.forEach((each) => {
        const book = books.find((book) => {
            return book.id === each.id;


        })



        book.issueBy = each.name;
        book.issueDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedbook.push(book);
    })

    if (issuedbook.length === 0) {
        return res.status(404).json({
            sucess: false,
            message: "no issued book found"
        })
    }

    return res.status(200).json({
        sucess: true,
        message: "issued book",
        data: issuedbook
    })

})



/*
route books/id
method get
parameters : id
to get book by id
*/

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            sucess: false,
            message: "book not found"
        })
    }

    return res.status(200).json({
        sucess: true,
        message: "book found",
        data: book
    })
})

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