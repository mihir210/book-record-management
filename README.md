# book-record-management

This is book record managenment API backend for management of records and books

---

# Routes and Endpoints

## /users

POST : create a new user

GET : Get all list of users

## /users/{id}

GET : get a user by id

PUT : update a user by id

DELETE : delete a user by id (check if he/she has an issued book. and fine for user)

---

## /users/subscrpition-details/{id}

GET : get user subscription details
1. date of subscription
2. valid till
3. fine if any

---

## /books
GET : get all notes 
POST : create/add a new book

---

## /books{id}
GET : get a book by id
PUT  : update a book by id


## books/issued
GET :  get all issued books


## books/issued/withfine
GET : get all issued book with fine

---

# subscription types
basic (3 months)
standard (6 months)
premium (12 months)

if the subscription date is 01/08/2022 and subscription type is standard the valid date will be 01/01/2023

if he has an issued book and the issued book is to be returned at 01/01/2023 and he missed it, then he gets a fine of 100 and subscription will experied and fine will be 200


