const express = require('express');
const app = express();
const port = 3000;

const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tgray27:sabercatsb-ball8@darkwebcrusaders.jdxzgjk.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

// Eventually could be used to serv our react app to prevent needing two web services / daemons
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'reactBuild/index.html'));
});

app.get('/api/v1/status',async (req, res) => {
    err = false;
    ert = ""
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      }
      catch (e) {
        err = true;
        ert = e;
      }
      finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
      if (err) {
          res.send(ert);
      } else {
          res.send('all good');
      }
});

app.get('/api/v1/tasks/getTasks', async (req, res) => {
    //return all the task currently outstanding
    await client.connect();
    const collection = await client.db("darkWebCrusaders").collection("taskMaster");
    const documents = await collection.find({}).toArray();
    res.json(documents);
});

app.get('/api/v1/tasks/getTaskByID/:taskID', async (req, res) => {
    //Returns a list with a single task when passed the object hash or whatever the fuck those number are.
    //example - http://localhost:3000/api/v1/tasks/getTaskByID/65307e05fe06afd897ca7d4b
    await client.connect();
    const collection = await client.db("darkWebCrusaders").collection("taskMaster");
    obj = new ObjectId(req.params.taskID)
    const documents = await collection.find({_id: obj}).toArray();
    res.json(documents);
});

app.post('/api/v1/tasks/createTask', async (req, res) => {
    try {
        const { title, desc, dueDate, tags } = req.body; // should send these parameters in the request body as JSON

        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");

        const result = await collection.insertOne({
            title, desc, dueDate, tags,
            status: "incomplete",
            completed: false
        });
        res.json({ success: true, message: 'Task created successfully', insertedId: result.insertedId });
    } 
    catch (err) {
        res.status(500).json({ success: false, message: 'Error creating the task', error: err });
    } finally {
        await client.close();
    }
});


app.put('/api/v1/tasks/updateTaskByID/:taskID', async (req, res) => {
    try {
        const { title, desc, dueDate, tags, status, completed } = req.body; // should send these parameters in the request body as JSON
        const obj = new ObjectId(req.params.taskID);

        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");

        const result = await collection.updateOne({ _id: obj }, {
            $set: { title, desc, dueDate, tags, status, completed }
        });

        if (result.modifiedCount === 1) {
            res.json({ success: true, message: 'Task updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating the task', error: err });
    } finally {
        await client.close();
    }
});

app.delete('/api/v1/tasks/deleteTaskByID/:taskID', async (req, res) => {
    try {
        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");
        const obj = new ObjectId(req.params.taskID);

        const result = await collection.deleteOne({ _id: obj });

        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting the task', error: err });
    } finally {
        await client.close();
    }
});

//Server
app.listen(port, () => {
    console.log('Server is up and running on port 3000');
});