// imports
import express from 'express';
import chalk from 'chalk';
import debugLib from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// mongodb imports
import pkg from 'mongodb';
const { MongoClient, ObjectId } = pkg;

const debug = debugLib('app');
const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const url = process.env.MONGODB_URL;
const url = 'mongodb+srv://anu:yOcyRiLplsqaV9X6@org-names.ge4w1vx.mongodb.net/?retryWrites=true&w=majority&appName=org-names'

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Create a MongoClient instance
let client;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    debug('Connected to the Mongo DB');
  }
  return client;
}

// routes
app.get('/', async (req, res) => {
  try {
    const client = await connectToMongo();
    const db = client.db('info');
    const info = await db.collection('org_info').find().toArray();
    res.render('index', { info }); // Send the response data to the client
  } catch (error) {
    debug('Failed to retrieve data:', error.stack);
    res.status(500).json({ error: 'Failed to retrieve data', details: error.message });
  }
});

// Handle form submission
app.post('/submit', async (req, res) => {
  console.log('req.body:', req.body);
  const { name, logo_url, desc, active } = req.body;
  
  const newOrg = {
    name: name,
    logo_url: logo_url,
    desc: desc,
    active: active === 'on' // Convert checkbox value to boolean
  };

  try {
    const client = await connectToMongo();
    const db = client.db('info');
    const info = await db.collection('org_info');
    await info.insertOne(newOrg);
    res.redirect('/');
  } catch (error) {
    debug('Failed to insert data:', error.stack);
    res.status(500).json({ error: 'Failed to insert data', details: error.message });
  }
});

// Delete route
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const client = await connectToMongo();
      const db = client.db('info');
      const info = await db.collection('org_info');
      await info.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Organization deleted successfully' });
      
    } catch (error) {
      debug('Failed to delete data:', error.stack);
      res.status(500).json({ error: 'Failed to delete data', details: error.message });
    }
  });
  

// listen on a port
app.listen(PORT, () => {
  debug(`Listening on port ${chalk.green(PORT)}`);
});
