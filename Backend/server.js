const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./models/User');
const Contact = require('./models/Contact');
const Review = require('./models/review');
const Feedback = require('./models/Feedback');
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Email not registered' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', firstName: user.firstName });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

//Contact

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();  // Save the contact data to MongoDB
    console.log('Contact saved to database:', contact);  

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (err) {
    console.error('Error saving contact form:', err);  
    res.status(500).json({ message: 'Error saving contact form', error: err });
  }
});


app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();  // Get all contact messages from MongoDB
    res.status(200).json(contacts);  // Return the list of contacts
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ message: 'Error fetching contacts', error: err });
  }
});


app.put('/api/contact/:id', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully', updatedContact });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({ message: 'Error updating contact', error: err });
  }
});

// ✅ Delete Contact Form (Delete)
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Error deleting contact', error: err });
  }
});

// Reviews Routes

// Create
app.post('/api/reviews', async (req, res) => {
  const { name, email, review, image } = req.body;
  try {
    const newReview = new Review({ name, email, review, image });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: 'Error saving review', error: err.message });
  }
});

// Read All
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Update by ID
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, review, image } = req.body;
    const updated = await Review.findByIdAndUpdate(
      id,
      { name, email, review, image },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
});

// Delete by ID
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
});

// Start the server
// Create
app.post('/feedbacks', async (req, res) => {
  const feedback = new Feedback(req.body);
  await feedback.save();
  res.send(feedback);
});

// Read
app.get('/feedbacks', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
});
// Update
app.put('/feedbacks/:id', async (req, res) => {
  const { id } = req.params;
  const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
  res.send(updatedFeedback);
});
// Delete
app.delete('/feedbacks/:id', async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted successfully' });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
