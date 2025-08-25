import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Receiver from '../models/Receiver.js';  // Your receiver model
import DonorItemModel from '../models/Donation_Item.js'; // Assuming you also want to interact with donor items for search

// Signup for Receiver
export const signupReceiver = async (req, res) => {
  const { name, email, password, org_id, income } = req.body;

  try {
    // Check if receiver already exists
    const existingReceiver = await Receiver.findOne({ email });
    if (existingReceiver) {
      return res.status(400).json({ message: 'Receiver already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new receiver
    const receiver = new Receiver({
      name,
      email,
      password: hashedPassword,
      org_id,
      income
    });

    // Save receiver to DB
    await receiver.save();

    // Generate JWT Token
    const token = jwt.sign({ id: receiver._id, role: 'receiver' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Receiver registered successfully!',
      token,
    });
  } catch (error) {
    console.error('Signup Error: ', error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Login for Receiver
export const loginReceiver = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if receiver exists
    const receiver = await Receiver.findOne({ email });
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, receiver.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: receiver._id, role: 'receiver' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Receiver logged in successfully!',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Create Donation Request for Receiver
export const createDonationRequest = async (req, res) => {
  const { item, quantity, description } = req.body;
  const receiverId = req.params.id;  // Receiver ID from URL param

  try {
    // Find the receiver in the database
    const receiver = await Receiver.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Create a donation request
    const newRequest = {
      item,
      quantity,
      description,
      status: 'pending',
    };

    // Push the request into receiver's donationRequests array
    receiver.donationRequests.push(newRequest);

    // Save the updated receiver document
    await receiver.save();

    res.status(201).json({ message: 'Donation request created successfully!', newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Get all Donation Requests for a specific Receiver
export const getDonationRequests = async (req, res) => {
  const receiverId = req.params.id;  // Receiver ID from URL param

  try {
    // Find the receiver and populate donation requests
    const receiver = await Receiver.findById(receiverId).populate('donationRequests');
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json({ donationRequests: receiver.donationRequests });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

// Search for Donations (by category or location)
export const searchDonations = async (req, res) => {
  const { category, location } = req.query;

  try {
    const query = {};
    if (category) query.category = category;
    if (location) query.location = location;

    // Find matching donations from DonorItemModel (assuming donations are stored in this model)
    const donations = await DonorItemModel.find(query);
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

