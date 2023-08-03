import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!)

        const db = mongoose.connection;

        db.on('connected', () => {
            console.log('Database connected');
        })

        db.on('error', (error) => {
            console.log('Database connection error', error);
        })
    }
    catch(error){
        console.log(error);
    }
}