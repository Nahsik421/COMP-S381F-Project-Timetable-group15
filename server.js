const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const mongourl = 'mongodb+srv://admin:p%40ssword@cluster0.tdhclia.mongodb.net/?appName=Cluster0';
const client = new MongoClient(mongourl);
const dbName = 'project_timetable';
const collectionName = "timetable";
const SECRETKEY = 'I want my timetable';

const users = new Array(
    { id: '1', name: 'student1', password: 'student12' },
    { id: '2', name: 'student23', password: 'student34' }
);

app.set('view engine', 'ejs');

app.use(session({
    name: 'studenttime',
    keys: [SECRETKEY]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
    await client.connect();
    return client.db(dbName).collection(collectionName);
}
// webpage and login
app.get('/', (req, res) => {
    if (!req.session.authenticated) {
        res.redirect('/login');
    } else {
        res.redirect('/timetable');
    }
});

app.get('/login', (req, res) => {
    res.status(200).render('login', {});
});

app.post('/login', (req, res) => {
    users.forEach((user) => {
        if (user.name === req.body.name && user.password === req.body.password) {
            req.session.authenticated = true;
            req.session.username = req.body.name;
            req.session.userId = user.id;
        }
    });
    res.redirect('/'); 
});


app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

app.get('/timetable', async (req, res) => {
    const collection = await connectDB();
    const entries = await collection.find({ userId: req.session.userId }).toArray();
    res.render('timetable', { entries, username: req.session.username });
});

app.post('/timetable', async (req, res) => {
    const collection = await connectDB();
    const newEntry = {
        subject: req.body.subject,
        day: req.body.day,
        month: req.body.month,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userId: req.session.userId
    };
    await collection.insertOne(newEntry);
    res.redirect('/timetable');
});


app.get('/timetable/:id/edit', async (req, res) => {
    const collection = await connectDB();
    const entry = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (entry) {
        res.render('edit', { entry }); 
    } else {
        res.redirect('/timetable'); 
    }
});


app.post('/timetable/:id/update', async (req, res) => {
    const collection = await connectDB();
    const updatedEntry = {
        subject: req.body.subject,
        day: req.body.day,
        month: req.body.month,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    };
    await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedEntry });
    res.redirect('/timetable');
});


app.get('/timetable/:id/delete', async (req, res) => {
    const collection = await connectDB();
    const entry = await collection.findOne({ _id: new ObjectId(req.params.id) });
    
    if (entry) {
        res.render('delete', { entry });
    } else {
        res.redirect('/timetable');
    }
});


app.post('/timetable/:id/delete', async (req, res) => {
    const collection = await connectDB();
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect('/timetable');
});


app.get('/timetable/:id/details', async (req, res) => {
    const collection = await connectDB();
    const entry = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (entry) {
        res.render('detail', { entry });
    } else {
        res.redirect('/timetable'); 
    }
});


app.get('/create', (req, res) => {
    const user = req.session.username;
    res.render('create', { user });
});
// RESTful
// Read(get)
app.get('/api/timetable', async (req, res) => {
    if (req.session.userId) {
        console.log(req.body);  
        const collection = await connectDB(); 
        const entries = await collection.find({ userId: req.session.userId }).toArray();
        res.status(200).send(JSON.stringify(entries, null, 5));  
    } else {
        res.status(401).json({ message: "Unauthorized API access" });
    }
});

// Read for one ID(get)
app.get('/api/timetable/:id', async (req, res) => {
    if (req.session.userId) {
        const collection = await connectDB(); 
        const entry = await collection.findOne({_id: new ObjectId(req.params.id), userId: req.session.userId});
        res.status(200).send(JSON.stringify(entry, null, 5));
    } else {
        res.status(401).json({ message: "Unauthorized API access" });
    }
});


// Create(post)
app.post('/api/timetable', async (req, res) => {
    if (req.session.userId) { 
        console.log(req.body);

        const newEntry = {
            subject: req.body.subject,
            day: req.body.day,
            month: req.body.month,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            userId: req.session.userId
        };
        
        const collection = await connectDB();
        const result = await collection.insertOne(newEntry);
        res.status(201).send(JSON.stringify({message: "Entry created successfully", id: result.insertedId, data: newEntry}, null, 5));
    } else {
        res.status(401).json({ message: "Unauthorized API access" });
    }
});
// Update (put)
app.put('/api/timetable/:id', async (req, res) => {
    if (req.session.userId) { 
        console.log(req.body);

        const updatedData = {
            subject: req.body.subject,
            day: req.body.day,
            month: req.body.month,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        };

        const collection = await connectDB();
        const result = await collection.updateOne({ _id: new ObjectId(req.params.id), userId: req.session.userId },{ $set: updatedData });
        res.status(200).send(JSON.stringify({ message: "Entry updated successfully", id: req.params.id, updatedData }, null, 5));
    } else {
        res.status(401).json({ message: "Unauthorized API access" });
    }
});
// Delete (delete)
app.delete('/api/timetable/:id', async (req, res) => {
    if (req.session.userId) { 
        console.log(req.body);

        collection = await connectDB();
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id),userId: req.session.userId});
        res.status(200).send(JSON.stringify({ message: "Entry deleted successfully" }));
    } else {
        res.status(401).json({ message: "Unauthorized API access" });
    }
});

app.listen(process.env.PORT || 8099, () => {
    console.log("Server is running on port 8099");
});





