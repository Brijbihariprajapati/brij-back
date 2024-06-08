const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    
        
            name: String,
            budget: {},
            owner: {},
            location: {},
            cars: [
              {}
            ]
          
});

const cruds = mongoose.model("cruds",Schema);
module.exports =cruds;
