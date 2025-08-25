import express from 'express';
import { signupReceiver, loginReceiver, createDonationRequest, getDonationRequests, searchDonations } from '../controllers/ReceiverController.js';
import { authenticate } from '../middleware/authmiddleware.js';  // Common authentication middleware
import { authorizeRole } from '../middleware/authmiddleware.js'; // Role-based authorization middleware

const router = express.Router();

// **Receiver Routes**

// 1. **Signup Route** - For new receivers to register
router.post('/signup', signupReceiver);

// 2. **Login Route** - For existing receivers to log in
router.post('/login', loginReceiver);

// 3. **Create Donation Request** - Receivers can create donation requests (Only accessible by Receivers)
router.post('/:id/request', authenticate, authorizeRole('receiver'), createDonationRequest);

// 4. **Get All Donation Requests** - Receivers can view their donation requests (Only accessible by Receivers)
router.get('/:id/requests', authenticate, authorizeRole('receiver'), getDonationRequests);

// 5. **Search Donations** - Receivers can search for donations (Accessible by anyone, optional role check if needed)
router.get('/donations', searchDonations);

export default router;
