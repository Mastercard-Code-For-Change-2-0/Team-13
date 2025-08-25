import express from 'express'
import AdminModel from '../models/admin.js'

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

  export default router;