const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const uri = "mongodb+srv://ron:<man123>@cluster0.vygfv.mongodb.net/<dbname>?retryWrites=true&w=majority";

const initDb = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        "auth": { "authSource": "admin" },
        "user": "ron",
        "pass": "man123"
      });
      console.log("Connected to database.");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  module.exports = initDb;