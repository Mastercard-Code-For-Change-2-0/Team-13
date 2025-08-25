import express from 'express'
import AdminModel from '../models/admin.js'
import Donor from '../models/donor.js';
import Receiver from '../models/receiver.js';
import Allocation from '../models/match.js';
import DonorItemModel from '../models/Donation_item.js'


const router = express.Router();

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const admin = await AdminModel.findOne({ email });
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.json({ message: "Login successful" });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  });

 
router.get("/pending-donations", async (req,res)=>{
    try {
        const donations = await DonorItemModel.find({});
        const pendingDonations = donations.filter(d => d.status === "pending");
        res.json(pendingDonations);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donations' });
      }
});

router.put("/donations/:id/status", async (req, res) => {
    try {
      const { status } = req.body; 
  
      
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const updatedDonation = await DonorItemModel.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true } 
      );
  
      if (!updatedDonation) {
        return res.status(404).json({ message: "Donation not found" });
      }
  
      res.json({
        message: `Donation successfully ${status}`,
        donation: updatedDonation,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update donation", error: error.message });
    }
  });


function calculateMatchScore(donor, request, receiver) {
    
    let itemMatch = donor.itemName.toLowerCase() === request.item.toLowerCase() ? 1 : 0;
    if (!itemMatch && donor.category) {
      const cat = donor.category.toLowerCase();
      if (
        (cat === "clothes" && request.item.toLowerCase().includes("cloth")) ||
        (cat === "books" && request.item.toLowerCase().includes("book")) ||
        (cat === "toys" && request.item.toLowerCase().includes("toy"))
      ) {
        itemMatch = 0.7;
      }
    }
  
    
    const quantityFit = Math.min(donor.quantity, request.quantity) / request.quantity;
  
    
    const ageDays = (Date.now() - new Date(request.createdAt)) / (1000 * 60 * 60 * 24);
    const requestAge = Math.min(ageDays / 30, 1); 
  
   
    const incomePriority = 1 - Math.min(receiver.income / 100000, 1); 
  
    const score = 0.5 * itemMatch + 0.2 * quantityFit + 0.2 * requestAge + 0.1 * incomePriority;
  
    return { score, itemMatch, quantityFit, requestAge, incomePriority };
  }


  router.get("/pending-requests", async (req, res) => {
    try {
      
      const receivers = await Receiver.find({
        "donationRequests.status": "pending",
      });
  
      const donorItems = await DonorItemModel.find({
        status: "approved",
        quantity: { $gt: 0 },
      });
  
      let results = [];
  
      receivers.forEach((receiver) => {
        receiver.donationRequests.forEach((request, index) => {
          if (request.status === "pending") {
           
            const matches = donorItems.map((donor) => {
              const scoreData = calculateMatchScore(donor, request, receiver);
              return { donor, score: scoreData.score };
            });
  
           
            matches.sort((a, b) => b.score - a.score);
  
            results.push({
              receiverId: receiver._id,
              receiverName: receiver.name,
              requestIndex: index,
              request,
              topMatches: matches.slice(0, 3), 
            });
          }
        });
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch pending requests" });
    }
  });




  router.post("/allocate", async (req, res) => {
    try {
      const { donorItemId, receiverId, requestIndex, quantity } = req.body;
  
      const donor = await DonorItemModel.findById(donorItemId);
      const receiver = await Receiver.findById(receiverId);
  
      if (!donor || !receiver) return res.status(404).json({ error: "Donor or Receiver not found" });
  
      const request = receiver.donationRequests[requestIndex];
      if (!request) return res.status(404).json({ error: "Request not found" });
  
      if (donor.quantity < quantity || request.quantity < quantity) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
  
      
      const allocation = new Allocation({
        donorItemId,
        receiverId,
        requestIndex,
        quantity,
      });
      await allocation.save();
  
      
      donor.quantity -= quantity;
      if (donor.quantity === 0) donor.status = "approved";
      await donor.save();
  
      request.quantity -= quantity;
      if (request.quantity === 0) request.status = "completed";
      await receiver.save();
  
      res.json({ message: "Allocation successful", allocation });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  export default router;