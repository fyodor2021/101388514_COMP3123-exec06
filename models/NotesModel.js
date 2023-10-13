const mongoose = require("mongoose");

//TODO - Create Note Schema here having fields
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  priority: String,
  date: Date,
  dateUpdated: Date,
});

module.exports = mongoose.model("note", noteSchema);
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated
