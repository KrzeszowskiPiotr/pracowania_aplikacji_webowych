const { MongoClient } = require('mongodb');

const mongo = new MongoClient(process.env.MONGODB_URL);
let connection = null;

async function connectMongoDB() {
    try {
        await mongo.connect();
        console.log('MongoDB connected');
        connection = mongo.db('blogLogs');
        return connection;
    } catch (e) {
        console.error('Mongo connection failed:', e);
        throw e;
    }
}

function getMongoDB() {
    if (!connection) throw new Error('MongoDB not initialized');
    return connection;
}

module.exports = { connectMongoDB, getMongoDB };
