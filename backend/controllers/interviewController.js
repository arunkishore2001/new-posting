
const Interview = require('../models/Interview');

exports.createInterview = async (req, res) => {
  try {
    const interview = new Interview(req.body);
    await interview.save();
    res.status(201).json({ message: 'Interview created successfully', interview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating interview', error });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving interviews', error });
  }
};
