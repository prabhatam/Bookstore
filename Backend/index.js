import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

const connectDb = async()=>{
    try {
        const mongoDbConnection = await mongoose.connect(URI);
        console.log(mongoDbConnection.connection.host);
    } catch (error) {
        console.log("Error connecting db : ",error);
        process.exit(1);        
    }
}

app.get("/",(req,res)=>{
    return res.status(200).json({"Bookstore Server Status":"Connected"})
})

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})

