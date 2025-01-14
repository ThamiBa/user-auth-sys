import mongoose from 'mongoose'; // Import mongoose
export const connectDB = async () => { // Async function to connect to MongoDB
    try { // Try to connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB
        console.log(`MongoDB Connected: ${conn.connection.host}`) // Log connection host
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message) // Log error message
        process.exit(1) // Exit with failure
    }
};