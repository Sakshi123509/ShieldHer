import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error(' Error connecting to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World');
}
);
// console.log(process.env.JWT_SECRET);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
