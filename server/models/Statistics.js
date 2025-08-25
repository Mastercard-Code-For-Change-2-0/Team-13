import mongoose from 'mongoose'

const StatisticsSchema = new Mongoose.Schema({
    totalDonors :Number,
    totalReceivers: Number,
    totalDonations:Number,
    donationFulfilled:Number,
    donationPending:Number,
})