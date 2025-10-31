const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experiance: {
    type: Number,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('jobs',jobSchema)