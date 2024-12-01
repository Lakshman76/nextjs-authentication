import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL! );
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })
        connection.on("error", (error) => {
            console.log("MongoDB connection error: ", error);
            process.exit();
        })
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);

    }
}