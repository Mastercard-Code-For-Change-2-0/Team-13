import mongoose, { connect } from "mongoose";

export default async function connect(){
    mongoose.connect('mongodb+srv://vibhashah0108:7LWOFtPTx3h2yZrW@practice.kd3wynm.mongodb.net/?retryWrites=true&w=majority&appName=practice')
    .then(()=>console.log('Mongo Connected'))
    .catch((err) => console.log("Error"))
}