require('dotenv').config();
const express = require('express');
const connectMongo = require('./config/connectDB.js');

// creating app
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('static'));

// handling api requests
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

connectMongo(() => {
  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
});
