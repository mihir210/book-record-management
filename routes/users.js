const express = require('express');
const { users } = require('../data/users.json');
const router = express.Router();
/*

route :  /users
method get
to get all user list
access : public
parameters : none
*/
router.get('/', (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "route found",
        data: users
    })
})


/*
route users/id
method get
parameters : id
to get user by id
*/

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: "user not found"
        })
    }

    return res.status(200).json({
        sucess: true,
        message: "user found",
        data: user
    })
})


/*

route /users
method post
create a user 

parameters none
*/

router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType } = req.body;

    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            sucess: false,
            message: "user exists with this id"
        })
    }

    const d = new Date();
    const subscriptionDate = d.toLocaleDateString();
    const newuser = { id, name, surname, email, subscriptionType, subscriptionDate }

    users.push(newuser);
    return res.status(201).json({
        sucess: true,
        data: newuser,
        message: "user added"
    })


})


/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found" });

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedUser,
    });
});


/*
route /users/:id
method delete
delete user by id
parameters  : id
*/


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            sucess: false,
            message: "user to delete is not found"
        })
    }

    const index = users.indexOf(user);
    users.slice(index, 1);

    return res.status(202).json({
        sucess: true,
        message: "user is deleted",
        data: users
    })


})

// default exports
module.exports = router;