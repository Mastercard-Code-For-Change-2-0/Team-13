import express from 'express'
import connect from './db.js'
import cors from 'cors'
import receiverRouter from './routes/receiverRoutes.js'
const PORT = process.env.PORT || 6000
const app = express()

connect()

app.use(cors());
app.use(express.json());


// app.use('/api/donor', donorRouter);
app.use('/api/receiver',receiverRouter);
// app.use('/api/admin',adminRouter);

app.listen(PORT,()=>{
    console.log(`Server started at : ${PORT}`)
})