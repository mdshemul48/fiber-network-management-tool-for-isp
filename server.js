require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('./config/connectDB.js');

// creating app
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'));

// Routers
const connectionRoutes = require('./routes/connectionRoutes.js');
// handling api requests (redirecting to apiRoutes)
app.use('/api', connectionRoutes);

connectMongo(() => {
  app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`);
  });
});
