const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  jobType: String,
  salaryMin: Number,
  salaryMax: Number,
  deadline: Date,
  description: String,
  isDraft: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
