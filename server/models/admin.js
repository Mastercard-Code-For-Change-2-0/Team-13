import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name :{ type: String },
    email:{ type: String, required : true },
    password: String,
    
},{collection:'Admin'})

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;