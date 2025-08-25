import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Receiver from '../models/Receiver.js'; 
import DonorItemModel from '../models/Donation_Item.js'; 


export const signupReceiver = async (req, res) => {
  const { name, email, password, org_id, income } = req.body;

  try {
    
    const existingReceiver = await Receiver.findOne({ email });
    if (existingReceiver) {
      return res.status(400).json({ message: 'Receiver already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 12);

    const receiver = new Receiver({
      name,
      email,
      password: hashedPassword,
      org_id,
      income
    });

   
    await receiver.save();

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


export const loginReceiver = async (req, res) => {
  const { email, password } = req.body;

  try {
 
    const receiver = await Receiver.findOne({ email });
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

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

export const createDonationRequest = async (req, res) => {
  const { item, quantity, description, location} = req.body;
  const receiverId = req.params.id;  

  try {
    const receiver = await Receiver.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    
    const newRequest = {
      item,
      quantity,
      description,
      status: 'pending',
      location
    };

    receiver.donationRequests.push(newRequest);

    await receiver.save();

    res.status(201).json({ message: 'Donation request created successfully!', newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};


export const getDonationRequests = async (req, res) => {
  const receiverId = req.params.id;  

  try {
    const receiver = await Receiver.findById(receiverId).populate('donationRequests');
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    res.status(200).json({ donationRequests: receiver.donationRequests });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

export const searchDonations = async (req, res) => {
  const { category, location } = req.query;

  try {
    const query = {};
    if (category) query.category = category;
    if (location) query.location = location;
    const donations = await DonorItemModel.find(query);
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

