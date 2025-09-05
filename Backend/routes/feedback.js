const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json({ success: true, feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET a specific feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST a new feedback
router.post('/', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    const savedFeedback = await newFeedback.save();
    res.status(201).json({ success: true, feedback: savedFeedback });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE a feedback
router.delete('/:id', async (req, res) => {
  try {
    const result = await Feedback.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE a feedback
router.put('/:id', async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    
    res.json({ success: true, feedback: updatedFeedback });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;