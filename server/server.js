const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// MongoDB connection string
const uri = "mongodb+srv://samhithacs20:mJVwbRopy9BgLuGr@cluster0.yyqir99.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database name
const dbName = 'new_db';
let db;
let coursesCollection;

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    coursesCollection = db.collection('new_collection');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
}

connectToMongo();

// Endpoint to get the list of courses
app.get('/api/courses', async (req, res) => {
  const courses = await coursesCollection.find({}).toArray();
  res.json(courses);
});

// Endpoint to approve a course
// Endpoint to approve a course
app.post('/api/courses/approve/:code', async (req, res) => {
  const { code } = req.params;
  const result = await coursesCollection.updateOne({ code: code }, { $set: { approved: true } });
  if (result.modifiedCount === 1) {
    res.json({ message: `Course with code ${code} approved`, approved: true });
  } else {
    res.status(404).json({ message: "Course not found or already approved" });
  }
});


// Endpoint to reject a course
app.post('/api/courses/reject/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await coursesCollection.deleteOne({ code: code });
    console.log("Delete operation result:", result);
    if (result.deletedCount === 0) {
      res.status(404).json({ message: `No course found with code ${code}` });
    } else {
      res.json({ message: `Course with code ${code} rejected`, result: result });
    }
  } catch (error) {
    console.error('Error rejecting course:', error);
    res.status(500).json({ message: 'Failed to reject course' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
