require('dotenv').config();

const express = require('express');
const server = express();


server.use(express.json());

const entriesHandler = require('./routes/wpisy');
const commentsHandler = require('./routes/komentarze');
const categoriesHandler = require('./routes/kategorie');

server.use('/api/entries', entriesHandler);
server.use('/api/comments', commentsHandler);
server.use('/api/categories', categoriesHandler);

server.use(function (error, request, response, next) {
  console.error('Błąd aplikacji:', error);
  response.status(error.statusCode || 500).send({
    status: 'fail',
    details: error.message || 'Internal application failure',
  });
});

const PORT = process.env.APP_PORT || 3222;
server.listen(PORT, () => {
  console.info(`Serwer uruchomiony na porcie ${PORT}`);
});