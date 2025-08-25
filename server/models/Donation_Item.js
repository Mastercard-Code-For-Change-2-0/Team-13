import mongoose from 'mongoose';

const donorItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },   // Changed to Number
  description: { type: String },
  imageFileId: { type: mongoose.Schema.Types.ObjectId }, // GridFS fileId
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  category: {
    type: String,
    enum: ['Clothes', 'Bags', 'Stationary', 'Toys', 'Furniture', 'Books'],
  },
  donorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const DonorItemModel = mongoose.model('DonorItem', donorItemSchema);

export default DonorItemModel;