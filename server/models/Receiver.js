import mongoose from 'mongoose';

const receiverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    income: { type: Number, required: true },  
    org_id: { type: Number, required: true }, 
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending',
    },
    donationRequests: [
        {
            item: { type: String, required: true },
            quantity: { type: Number, required: true },
            description: { type: String },
            status: {
                type: String,
                enum: ['pending', 'approved', 'fulfilled'],
                default: 'pending',
            },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });


const Receiver = mongoose.model('Receiver', receiverSchema);
export default Receiver;
