require('dotenv').config();
const express = require('express');
const { connectMongoDB, getMongoDB } = require('./db');

const server = express();
server.use(express.json());

connectMongoDB().then(() => {
    const mongo = getMongoDB();

    server.use(async (req, res, next) => {
        const logEntry = { url: req.originalUrl, method: req.method, body: req.body, at: new Date() };
        try { await mongo.collection('accessLogs').insertOne(logEntry); }
        catch (e) { console.warn('Log error:', e); }
        next();
    });

    const wpisyRouter = require('./routes/wpisy');
    const komentarzeRouter = require('./routes/komentarze');
    const kategorieRouter = require('./routes/kategorie');

    server.use('/wpisy', wpisyRouter);
    server.use('/komentarze', komentarzeRouter);
    server.use('/kategorie', kategorieRouter);

    server.use(async (err, req, res, next) => {
        const log = { code: err.status || 500, msg: err.message || 'Server error', time: new Date() };
        try { await mongo.collection('errorLogs').insertOne(log); }
        catch (e) { console.error('Error log failed:', e); }
        res.status(log.code).json({ error: log.msg });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
});
