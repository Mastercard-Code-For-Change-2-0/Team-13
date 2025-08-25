import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";

import mongoose from "mongoose";

const storage = multer.memoryStorage();
export const upload = multer({ storage });
import { authenticate, authorizeRole } from "../middleware/authmiddleware.js";
import { body, validationResult } from "express-validator";
import DonorItem from "../models/Donation_Item.js";
import DonorModel from "../models/Donor.js";

const router = express.Router();

const JWT_SECRET = "abc123";

router.post("/signup", [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars"),
  body("contact").notEmpty().withMessage("Contact number required"),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, contact, Location } = req.body;

    let existingDonor = await DonorModel.findOne({ email });
    if (existingDonor) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDonor = new DonorModel({ name, email, password: hashedPassword, contact, Location });
    await newDonor.save();

    res.status(201).json({ message: "Donor registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
], async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await DonorModel.findOne({ email });
    if (!donor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ donorId: donor._id, role: "donor" }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, donor });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/profile", authenticate, authorizeRole("donor"), async (req, res) => {
  try {
    const donor = await DonorModel.findById(req.user.donorId).select("-password");
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    res.json(donor);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/donate", authenticate, authorizeRole("donor"), upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image file required" });

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });

    const fileId = await new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(req.file.originalname, { contentType: req.file.mimetype });
      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", (file) => {
        console.log("File uploaded:", file); 
        resolve(file._id);
      });
      uploadStream.on("error", (err) => reject(err));
    });

    const donorItem = new DonorItem({
      donorID: req.user.donorId,
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category,
      imageFileId: fileId,
    });

    await donorItem.save();
    res.status(201).json({ message: "Donation created", donorItem });
  } catch (err) {
    console.error("Donate route error:", err); // ✅ log full error
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



router.get("/file/:id", async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
    bucket.openDownloadStream(fileId).pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;