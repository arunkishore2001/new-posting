const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  addCandidate: { type: String, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Interview', interviewSchema);
