// imports
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// mongodb imports
import mongoose from 'mongoose';
import pkg from 'mongodb';
const { MongoClient, ObjectId } = pkg;

const PORT = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// routes
app.get('/',(async (req, res)=>{
	const url = process.env.MONGODB_URL;
    const dbName = 'info';
    let client;

    try {
        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');
        
        const db = client.db(dbName);
        
        const info = await db.collection('org_info').find().toArray();
        res.render('index', {info}); // Send the response data to the client
    } catch (error) {
        debug('Failed to insert data:', error.stack);
        res.status(500).json({ error: 'Failed to retrive data', details: error.message });
    } 
    client.close();
}));

// listen on a port
app.listen(PORT, () => {
    debug(`Listening on port ${chalk.green(PORT)}`);
});
