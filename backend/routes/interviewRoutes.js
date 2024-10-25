
const express = require('express');
const { createInterview, getInterviews } = require('../controllers/interviewController');
const router = express.Router();

router.post('/api/interviews', createInterview);
router.get('/api/interviews', getInterviews); // New route to fetch interview data

module.exports = router;
