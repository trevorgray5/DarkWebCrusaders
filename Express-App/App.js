const express = require('express');
const bodyParser = require('body-parser')

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
app.use(express.static("reactBuild"));

app.get('/api/v1/status',async (req, res) => {
    err = false;
    ert = ""
    try {
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
    try {
        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");
        const documents = await collection.find({}).toArray();
        res.json(documents);
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error creating the task', error: err });
    }
    finally {
        await client.close();
    }
});

app.get('/api/v1/tasks/getTaskByID/:taskID', async (req, res) => {
    try {
        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");
        obj = new ObjectId(req.params.taskID)
        const documents = await collection.find({_id: obj}).toArray();
        if (documents.length < 1) {
            res.status(404).json({ success: false, message: 'Task not found' });
        } else {
            res.json(documents[0]);
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error getting task', error: err });
    }
    finally {
        await client.close();
    }
});

app.use(bodyParser.json())
app.post('/api/v1/tasks/createTask', async (req, res) => {
    try {
        const {title, desc, dueDate, tags} = req.body; // should send these parameters in the request body as JSON

        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");

        const result = await collection.insertOne({
            title, desc, dueDate, tags,
            status: "incomplete",
            completed: false
        });
        res.json({success: true, message: 'Task created successfully', insertedId: result.insertedId});
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Error creating the task', error: err });
    }
    finally {
        await client.close();
    }
});

app.use(bodyParser.json())
app.put('/api/v1/tasks/updateTaskByID/:taskID', async (req, res) => {
    //If this function seems to cause any indexing issues it might because updating a task seems to change the ID, id seems to be a hash.
     try {
        const { title, desc, dueDate, tags, status, completed } = req.body; // should send these parameters in the request body as JSON
        const obj = new ObjectId(req.params.taskID);

        await client.connect();
        const collection = await client.db("darkWebCrusaders").collection("taskMaster");

        const result = await collection.updateOne({ _id: obj}, {
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

app.use(bodyParser.json())
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