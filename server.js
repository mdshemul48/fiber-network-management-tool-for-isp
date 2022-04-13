require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const connectMongo = require('./config/connectDB.js');

// creating app
const app = express();

app.use(cors());

const port = process.env.PORT || 5000;
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
