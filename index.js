const express = require('express')
const { users } = require('./data/users.json');

const app = express();

const port = 4552;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
})


/*

route :  /users
method get
to get all user list
access : public
parameters : none
*/
app.get('/users', (req, res) => {
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

app.get('/users/:id', (req, res) => {
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

app.post('/users', (req, res) => {
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
app.put("/users/:id", (req, res) => {
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



app.get("*", (req, res) => {
    res.status(404).json({
        message: "this route does not exist"
    })
})


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})