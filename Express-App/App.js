const express = require('express');
const app = express();
const port = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tgray27:sabercatsb-ball8@darkwebcrusaders.jdxzgjk.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

//Route Definition
app.get('/',async (req, res) => {
    // res.send('Hello, Express.js');
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
      res.send('200');
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