import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { authenticateToken } from './utilities.js'

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
})

app.listen(8000, () => {
    console.log('server running on port 8000!');
})

export default app;