import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
export default async function connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Mongo Connected'))
    .catch((err) => console.log("Error"))
}