const express = require('express')

const app = express();

const port = 4552;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    })
})


app.get("*", (req, res) => {
    res.status(404).json({
        message: "this route does not exist"
    })
})


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})