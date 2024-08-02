const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  // posts: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Post'
  // }]
});

module.exports = catSchema;
