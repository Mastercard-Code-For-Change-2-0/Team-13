import mongoose from 'mongoose'

const receiverSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    income :Number,
    org_id:Number,
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'},
})

module.exports = mongoose.model('Receiver', receiverSchema );