const mongoose = require("mongoose");

mongoose.set('debug', true);


const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    username:String, 
    password:String, 
    email:String, 
    first_name:String, 
    last_name:String,
    gender:String,
    country:String
  },
  { timestamps: true, collection: 'users'},
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Users", DataSchema);