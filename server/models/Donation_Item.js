import mongoose from 'mongoose';


const donor_itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: String, required: true },
    imageFileId: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
    description: {type: String},
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
                default: 'pending',
              },
    category:{
                type: String,
                enum: ['Clothes', 'Bags', 'Stationary', 'Toys','Furniture','Books']
              },
    donorID:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Donor'
    }
})

const DonorItemModel =  mongoose.model('Donor Item', donor_itemSchema);

export default DonorItemModel;