import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { body, validationResult } from "express-validator";
import DonorModel from "../models/Donor.js";

const router = express.Router();

const JWT_SECRET = "abc123";

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ chars"),
    body("contact").notEmpty().withMessage("Contact number required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, contact, Location } = req.body;

      let existingDonor = await DonorModel.findOne({ email });
      if (existingDonor) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newDonor = new DonorModel({
        name,
        email,
        password: hashedPassword,
        contact,
        Location,
      });

      await newDonor.save();

      res.status(201).json({ message: "Donor registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const donor = await DonorModel.findOne({ email });
      if (!donor) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, donor.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ donorId: donor._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token, donor });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const donor = await DonorModel.findById(decoded.donorId).select("-password");

    if (!donor) return res.status(404).json({ message: "Donor not found" });

    res.json(donor);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;

