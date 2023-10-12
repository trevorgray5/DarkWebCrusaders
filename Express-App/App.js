const express = require('express');
const app = express();
const port = 3000;

//Route Definition
app.get('/',(req, res) => {
    res.send('Hello, Express.js');
});

app.get('/api/v1/tasks/getTasks', (req, res) => {

});

app.get('/api/v1/tasks/getTaskByID', (req, res) => {

});

app.get('/api/v1/tasks/createTask', (req, res) => {

});

app.get('/api/v1/tasks/updateTaskByID', (req, res) => {

});

app.get('/api/v1/tasks/deleteTaskByID', (req, res) => {

});

//Server
app.listen(port, () => {
    console.log('Server is up and running on port 3000');
});