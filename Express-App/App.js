const express = require('express');
const app = express();
const port = 3000;

//Route Definition
app.get('/',(req, res) => {
    res.send('Hello, Express.js');
});

//Server
app.listen(port, () => {
    console.log('Server is up and running on port 3000');
});