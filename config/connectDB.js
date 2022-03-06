const mongoose = require('mongoose');

// this module exports a function that connect with mongodb

const connectDB = async (callBack) => {
  const mongooseConnectUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.91aij.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  mongoose.connect(
    mongooseConnectUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log('Error connecting to database: ', err);
      } else {
        callBack();
      }
    }
  );
};

module.exports = connectDB;
