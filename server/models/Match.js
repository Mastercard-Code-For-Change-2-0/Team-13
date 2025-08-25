import mongoose from 'mongoose';


const allocationSchema = new mongoose.Schema({
      donorItemId: { type: mongoose.Schema.Types.ObjectId, ref: "DonorItem", required: true },
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Receiver", required: true },
      requestIndex: { type: Number, required: true }, 
      quantity: { type: Number, required: true },
      status: { 
        type: String, 
        enum: ["allocated", "delivered"], 
        default: "allocated" 
      },
      allocatedAt: { type: Date, default: Date.now },
    },{collections:"Allocation"});
    
const Allocation = mongoose.model("Allocation", allocationSchema);
export default Allocation;


