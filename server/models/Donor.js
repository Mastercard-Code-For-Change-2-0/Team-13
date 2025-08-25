import mongoose from 'mongoose'

const donorSchema = new mongoose.Schema({
    name:String,
    email :String,
    password:String,
    contact:String,
    Location:String
})

const DonorModel =  mongoose.model('Donor', donorSchema);

export default DonorModel;
